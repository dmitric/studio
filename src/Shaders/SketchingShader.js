import Shader from './Shader.js'
import { randomIntFromInterval } from '../Utils.js'
import { voronoi } from 'd3'
import tinycolor from 'tinycolor2'

/**
* Sketching shader
*/
export default class SketchingShader extends Shader {
  
  constructor (name) {
    super(name || "Sketching")
  }

  drawParticle (ctx, data, x, y) {
    var dim = data.blockDimension/5
    ctx.moveTo(x + dim, y);
    ctx.arc(x, y, dim, 0, 2 * Math.PI, false)
  }

  drawLink(ctx, x0, y0, x1, y1) {
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
  }

  prepare (ctx, data, palette) {
    ctx.lineWidth = 1
    
    if (palette.backgroundColor) {
      ctx.fillStyle = palette.backgroundColor
      ctx.fillRect(0, 0,
        data.blockDimension * data.columnCount * this.horizontalSkip,
        data.blockDimension * data.rowCount * this.verticalSkip)
    } else {
      ctx.fillStyle = palette.getColorFromPixel({color: '#111', brightness: 0.1})
      
      ctx.fillRect(0, 0,
        data.blockDimension * data.columnCount * this.horizontalSkip,
        data.blockDimension * data.rowCount * this.verticalSkip)
    }
  }

  render (ctx, data, palette) {

    this.prepare(ctx, data, palette)

    const voro = voronoi()
    const particles = []
    const resolution = Math.min(data.rowCount, data.columnCount)
    
    const width = data.rowCount * data.blockDimension
    const height = data.columnCount * data.blockDimension

    // generate particles
    data.pixelGrid.forEach(pixelRow => {
      pixelRow.forEach(pixel => {
        let addParticle
        const xmin = pixel.x * data.blockDimension
        const xmax = xmin + data.blockDimension

        const ymin = pixel.y * data.blockDimension
        const ymax = ymin + data.blockDimension

        if (resolution < 7) {
          addParticle = true;
        } else if (resolution <= 30) {
          addParticle = Math.random() <= 0.60;
        } else {
          addParticle = Math.random() <= 0.40;
        }

        if (addParticle) {
          particles.push({ 0: randomIntFromInterval(xmin, xmax), 1: randomIntFromInterval(ymin, ymax) })
        }
      })
    })

    if (!this.shouldFill()){
      for (let i = 0; i <= width; i += data.blockDimension) {
        particles.push([i, 0], [i, height])
      }

      for (let i = 0; i <= height; i += data.blockDimension) {
        particles.push([0, i], [width, i])
      }

      // just make sure this gets pushed
      particles.push([width, height])
    }

    var links = voro.links(particles)

    ctx.beginPath()

    links.forEach(l => {
      var pixX = Math.min(Math.floor(l.source[0]/data.blockDimension), data.columnCount-1)

      var pixY = Math.min(Math.floor(l.source[1]/data.blockDimension), data.rowCount-1)
      
      var pix = data.pixelGrid[pixX][pixY]

      var pixX2 = Math.min(Math.floor(l.target[0]/data.blockDimension), data.columnCount-1)

      var pixY2 = Math.min(Math.floor(l.target[1]/data.blockDimension), data.rowCount-1)
      
      var pix2 = data.pixelGrid[pixX2][pixY2]

      var check = this.shouldFill() ? pix.brightness < 0.7 && pix2.brightness < 0.7 : pix.brightness > 0.7 && pix2.brightness > 0.7
      
      if (check) {
        this.drawLink(ctx, l.source[0], l.source[1], l.target[0], l.target[1])
      }
    });

    particles.forEach(p => {
      var pixX = Math.min(Math.floor(p[0]/data.blockDimension), data.columnCount - 1)

      var pixY = Math.min(Math.floor(p[1]/data.blockDimension), data.rowCount - 1)
      
      var pix = data.pixelGrid[pixX][pixY]

      var checkForDraw = this.shouldFill() ? pix.brightness < 0.7 : pix.brightness > 0.7
      
      if (checkForDraw) {
        this.drawParticle(ctx, data, p[0], p[1])
      } else {
        if (Math.random() <= 0.25) {
          this.drawParticle(ctx, data, p[0], p[1])
        }
      }
    })

    ctx.lineWidth = data.blockDimension / 12
    
    let fillColor

    if (palette.backgroundColor) {
      let pcol = tinycolor(palette.backgroundColor)
      
      if (pcol.isLight()) {
        fillColor = palette.getColorFromPixel({color: '#EBF4EF', brightness: 0.2})
      } else {
        fillColor = palette.getColorFromPixel({color: '#EBF4EF', brightness: 0.6})
      }
    } else {
      fillColor = palette.getColorFromPixel({color: '#EBF4EF', brightness: 0.6})
    }

    if (fillColor === 'transparent') {
      fillColor = '#EBF4EF'
    }

    this.fillPixelWithColor(ctx, fillColor, fillColor)
  }
}