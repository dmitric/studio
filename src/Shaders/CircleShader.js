import Shader from './Shader.js'

/**
* Basic CircleShader
*/
export default class CircleShader extends Shader {
  
  constructor (name) {
    super(name || "Circles")
  }

  renderCircleWithRadius(ctx, pixel, data, palette, radius) {
    ctx.beginPath()

    ctx.arc(
      (pixel.x + 0.5) * data.blockDimension,
      (pixel.y + 0.5) * data.blockDimension,
      radius,
      0, 2 * Math.PI, false
    )

    ctx.closePath()

    this.fillPixelWithPalette(ctx, pixel, palette)
  }

  renderPixel (ctx, pixel, data, palette) {
    this.renderCircleWithRadius(
      ctx,
      pixel,
      data,
      palette,
      0.90 * (data.blockDimension/2)
    )
  }
}
