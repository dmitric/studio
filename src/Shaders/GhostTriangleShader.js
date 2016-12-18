import Shader from './Shader.js'
import tinycolor from 'tinycolor2'

export default class GhostTriangleShader extends Shader {
  
  constructor (name) {
    super(name || "Ghost Triangle")
  }

  renderPixel (ctx, pixel, data, palette) {

    const col = tinycolor(palette.getColorFromPixel(pixel))
    col.setAlpha(Math.min(pixel.brightness, 0.85))

    const rgbCol = col.toRgbString()
      
    const deg = Math.floor((Math.random() * 180) + 1)
      
    const topX = data.blockDimension * (pixel.x - 1/2)
    const topY = data.blockDimension * (pixel.y - 1)

    const centerX = topX + data.blockDimension/2
    const centerY = topY + data.blockDimension/2

    const rand = Math.floor((Math.random() * 3) + 1)

    const actualWidth = data.blockDimension * 2.25 + rand
    const actualHeight = data.blockDimension * 2.25 + rand

    ctx.save()
    ctx.translate(centerX, centerY) // pivot point
    ctx.rotate(deg * Math.PI/180) // rotate square in radians
    ctx.beginPath()

    const start = -data.blockDimension/2 + Math.floor((Math.random() * 10) + 1)
    
    ctx.moveTo(start, start)
    ctx.lineTo(start + actualWidth, start)
    ctx.lineTo((start + actualWidth)/2, actualHeight)
    ctx.lineTo(start, start)

    ctx.closePath()
    ctx.restore()

    this.fillPixelWithColor(ctx, rgbCol, rgbCol)
  }
}
