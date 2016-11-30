import CircleShader from './CircleShader.js'

export default class DiscShader extends CircleShader {
  
  constructor (name) {
    super(name || "Discs")
  }

  renderPixel (ctx, pixel, data, palette) {
    
    //Draw outer circle
    super.renderPixel(ctx, pixel, data, palette)

    // Draw inner circle
    ctx.beginPath()

    ctx.arc(
      (pixel.x + 0.5) * data.blockDimension,
      (pixel.y + 0.5) * data.blockDimension,
      (data.blockDimension/2) * Math.max(Math.min(1-pixel.brightness, 0.8), 0.125) * 0.9,
      0, 2 * Math.PI, false
    )

    ctx.closePath()

    this.fillPixelWithColor(ctx, palette.backgroundColor || this.options.defaultColor, palette.getColorFromPixel(pixel))
  }
}