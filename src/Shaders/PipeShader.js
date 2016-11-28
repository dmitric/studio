import Shader from './Shader.js'

/**
* PipeShader
*/
export default class PipeShader extends Shader {
  
  constructor (name) {
    super(name || "Pipes")
  }

  renderPixel(ctx, pixel, data, palette) {

    ctx.beginPath()

    if (pixel.brightness < 0.15 && pixel.brightness > 0.08) {

      ctx.rect(
        pixel.x * data.blockDimension,
        (pixel.y + 1/3) * data.blockDimension,
        data.blockDimension,
        data.blockDimension/3
      )

    } else {
      
      ctx.rect(
        pixel.x * data.blockDimension,
        (pixel.y + 1/3) * data.blockDimension,
        data.blockDimension,
        data.blockDimension/3
      )

      ctx.rect(
        (pixel.x + 4/3) * data.blockDimension,
        (pixel.y) * data.blockDimension,
        data.blockDimension/3,
        data.blockDimension
      )

    }

    ctx.closePath()

    ctx.fillStyle = palette.getColorFromPixel(pixel)
    ctx.strokeStyle = palette.getBorderColorFromPixel(pixel)

    ctx.fill()
    ctx.stroke()

  }
}