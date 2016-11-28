import Shader from './Shader.js'

/**
* Basic PixelShader
*/
export default class CircleShader extends Shader {
  
  constructor (name) {
    super(name || "Circles")
  }

  renderPixel(ctx, pixel, data, palette) {
    ctx.beginPath()

    ctx.arc(
      (pixel.x + 0.5) * data.blockDimension,
      (pixel.y + 0.5) * data.blockDimension,
      0.90 * (data.blockDimension/2) * pixel.brightness,
      0, 2 * Math.PI, false
    )

    ctx.fillStyle = palette.getColorFromPixel(pixel)
    ctx.strokeStyle = palette.getBorderColorFromPixel(pixel)

    ctx.fill()
    ctx.stroke()
  }
}