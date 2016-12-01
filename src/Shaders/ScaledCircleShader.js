import CircleShader from './CircleShader.js'

/**
* Basic CircleShader
*/
export default class ScaledCircleShader extends CircleShader {
  
  constructor (name) {
    super(name || "Scaled Circles")
  }

  renderPixel (ctx, pixel, data, palette) {
    this.renderCircleWithRadius(
      ctx,
      pixel,
      data,
      palette,
      0.90 * (data.blockDimension/2) * Math.min(pixel.brightness + 0.1, 1)
    )
  }
}