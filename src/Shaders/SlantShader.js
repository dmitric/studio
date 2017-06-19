import Shader from './Shader.js'

export default class SlantShader extends Shader {
  
  constructor (name) {
    super(name || "Slant")
    this.maxWidth = 0.4
  }

  getScalingFactor (pixel) {
    const inverseBrightness = 1-pixel.brightness
    
    if (inverseBrightness >= 0.9) {
      return inverseBrightness * 0.4
    } else if (inverseBrightness >= 0.7) {
      return inverseBrightness * 0.3
    } else if (inverseBrightness >= 0.6) {
      return inverseBrightness * 0.2
    } else {
      return 0.05 * inverseBrightness;
    }

  }

  renderPixel (ctx, pixel, data, palette) {

    const centerX = data.blockDimension * (pixel.x + 1/2)
    const centerY = data.blockDimension * (pixel.y + 1/2)

    const slantWidth = data.blockDimension * this.getScalingFactor(pixel)

    ctx.save()

    ctx.translate(centerX, centerY) // pivot point
    ctx.rotate(45 * Math.PI/180) // rotate square in radians

    ctx.beginPath()

    ctx.rect(
      - slantWidth / 2,
      - data.blockDimension / 2,
      slantWidth,
      data.blockDimension)

    ctx.closePath()
    ctx.restore()

    this.fillPixelWithPalette(ctx, pixel, palette)
  }
}