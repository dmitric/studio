import Shader from './Shader.js'
import tinycolor from 'tinycolor2'

/**
* Basic PixelShader
*/
export default class GhostSquareShader extends Shader {
  
  constructor (name) {
    super(name || "Ghost Square")
  }

  renderPixel(ctx, pixel, data, palette) {

    const col = tinycolor(palette.getColorFromPixel(pixel))
    col.setAlpha(Math.min(pixel.brightness, 0.85))
      
    const deg = Math.floor((Math.random() * 30) + 1)
      
    const topX = data.blockDimension * (pixel.x - 1/2)
    const topY = data.blockDimension * (pixel.y - 1)

    const centerX = topX + data.blockDimension/2;
    const centerY = topY + data.blockDimension/2;

    const rand = Math.floor((Math.random() * 3) + 1);

    const actualWidth = data.blockDimension * 2.25 + rand
    const actualHeight = data.blockDimension * 2.25 + rand

    ctx.save()
    ctx.translate(centerX, centerY) // pivot point
    ctx.rotate(deg * Math.PI/180) // rotate square in radians
    ctx.beginPath()
    
    ctx.rect(
      -data.blockDimension/2 + Math.floor((Math.random() * 10) + 1),
      -data.blockDimension/2 + Math.floor((Math.random() * 10) + 1),
      actualWidth,
      actualHeight
    )

    ctx.closePath()
    ctx.restore()

    ctx.fillStyle = col.toRgbString()
    ctx.fill()

    if (false) {
      ctx.strokeStyle = col.toRgbString()
      ctx.stroke()
    }
  }
}