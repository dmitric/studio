import Shader from './Shader.js'

import tinycolor from 'tinycolor2'

import { randomIntFromInterval } from '../Utils.js'

export default class CloseShader extends Shader {
  
  constructor (name) {
    super(name || "Close")
    this.horizontalSkip = 2
  }

  renderPixel (ctx, pixel, data, palette) {
    ctx.lineWidth = 1

    var col = tinycolor(pixel.color)
    var convertedCol = tinycolor(palette.getColorFromPixel(pixel))
    
    var blockWidth = data.blockDimension*2
    
    var topX = pixel.x*blockWidth
    var topY = pixel.y*blockWidth/2

    if (pixel.y % 2 === 0) {
      topX -= blockWidth/2
    }

    ctx.beginPath();

    ctx.moveTo(topX, topY+blockWidth/2)
    ctx.lineTo(topX + blockWidth/2, topY)
    ctx.lineTo(topX + blockWidth, topY+blockWidth/2)
    ctx.lineTo(topX + blockWidth/2, topY+blockWidth)
    ctx.lineTo(topX, topY+blockWidth/2)

    ctx.closePath()

    this.fillPixelWithPalette(ctx, pixel, palette)

    var result = randomIntFromInterval(1, 5)

    if (result === 1 || result === 2) {
      
      if (col.toHexString() === "#ffffff") {
        return
      }

      ctx.beginPath()

      ctx.arc(topX + 0.5 * blockWidth,
              topY + 0.5 * blockWidth,
              0.6*(blockWidth/2) * convertedCol.getBrightness()/255, 0, 2 * Math.PI, false)

      ctx.closePath()

      if (col.isLight()) {
        ctx.fillStyle = convertedCol.lighten(7).toString()
      } else {
        ctx.fillStyle = convertedCol.darken(7).toString()
      }

      ctx.strokeStyle = ctx.fillStyle

      this.fill(ctx)

      if (!this.shouldFill()){ 
        this.stroke(ctx)
      }

    } else if (result === 3) {
      ctx.beginPath()

      ctx.arc(topX + 0.5 * blockWidth,
              topY + 0.5 * blockWidth,
              0.4*(blockWidth/2), 0, 2 * Math.PI, false)

      ctx.closePath()

      ctx.lineWidth = 0.2*(blockWidth/2)
      
      ctx.strokeStyle = convertedCol.darken(5).toString()

      this.stroke(ctx)
    }
  }

  stroke (ctx) {
    if (this.shouldStroke()) {
      ctx.stroke()
    }
  }
}
