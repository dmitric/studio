import Shader from './Shader.js'
import { randomIntFromInterval, shuffle } from '../Utils.js'
import { voronoi } from 'd3'
import tinycolor from 'tinycolor2'


export default class CircleSketchingShader extends Shader {
  
  constructor (name) {
    super(name || "Circle Sketching")
  }

  drawCircle(ctx, x0, y0, x1, y1) {

    const centerX = (x0 + x1)/2
    const centerY = (y0 + y1)/2

    const r = Math.sqrt(Math.pow(y1 - y0, 2) + Math.pow(x1 - x0, 2))/2

    ctx.beginPath()
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI, false)
    ctx.closePath()
  }

  prepare (ctx, data, palette) {
    ctx.lineWidth = data.blockDimension/12
    
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

  renderPixels (ctx, data, palette) {
    const voro = voronoi()
    const particles = []
    const resolution = Math.min(data.rowCount, data.columnCount)

    // generate particles
    data.pixelGrid.forEach(pixelRow => {
      pixelRow.forEach(pixel => {
        let addParticle
        const xmin = pixel.x * data.blockDimension
        const xmax = xmin + data.blockDimension

        const ymin = pixel.y * data.blockDimension
        const ymax = ymin + data.blockDimension

        if (resolution < 7) {
          addParticle = true
        } else if (resolution <= 30) {
          addParticle = Math.random() <= 0.60
        } else {
          addParticle = Math.random() <= 0.40
        }

        if (addParticle) {
          particles.push({ 0: randomIntFromInterval(xmin, xmax), 1: randomIntFromInterval(ymin, ymax) })
        }
      })
    })

    const links = voro.links(particles)

    shuffle(links).forEach(l => {
      let pixX = Math.min(Math.floor(l.source[0]/data.blockDimension), data.columnCount-1)

      let pixY = Math.min(Math.floor(l.source[1]/data.blockDimension), data.rowCount-1)
      
      let pix = data.pixelGrid[pixX][pixY]

      let pixX2 = Math.min(Math.floor(l.target[0]/data.blockDimension), data.columnCount-1)

      let pixY2 = Math.min(Math.floor(l.target[1]/data.blockDimension), data.rowCount-1)
      
      let pix2 = data.pixelGrid[pixX2][pixY2]

      let check = this.shouldFill() ? pix.brightness < 0.7 && pix2.brightness < 0.7 : pix.brightness > 0.7 && pix2.brightness > 0.7
      
      if (check) {


        this.drawCircle(ctx, l.source[0], l.source[1], l.target[0], l.target[1])

        ctx.lineWidth = data.blockDimension / 2.5

        const outsideFill = palette.backgroundColor || palette.getColorFromPixel({color: '#111', brightness: 0.1})

        this.fillPixelWithColor(ctx, outsideFill, outsideFill)

        this.drawCircle(ctx, l.source[0], l.source[1], l.target[0], l.target[1])

        ctx.lineWidth = data.blockDimension / 3.5
    
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
    });

  }

  fill (ctx) {

  }

  stroke (ctx) {
    if (this.shouldStroke()) {
      ctx.stroke()
    }
  }
}