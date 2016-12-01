import Shader from './Shader.js'

/**
* Basic CircleShader
*/
export default class ScaledCircleShader extends Shader {
  
  constructor (name) {
    super(name || "Scaled Circles")
  }

  renderPixel (ctx, pixel, data, palette) {
    ctx.beginPath()

    ctx.arc(
      (pixel.x + 0.5) * data.blockDimension,
      (pixel.y + 0.5) * data.blockDimension,
      0.90 * (data.blockDimension/2) * pixel.brightness,
      0, 2 * Math.PI, false
    )

    ctx.closePath()

    this.fillPixelWithPalette(ctx, pixel, palette)
  }
}