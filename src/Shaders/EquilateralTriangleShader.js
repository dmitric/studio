import Shader from './Shader.js'

export default class EquilateralTriangleShader extends Shader {
  
  constructor (name) {
    super(name || "Equilateral Triangles")
    this.verticalSkip = 2
  }

  renderPixel (ctx, pixel, data, palette) {

    const triangleWidth = data.blockDimension*2

    const starter = triangleWidth/2

    const triangleHeight = triangleWidth

    const startingX = pixel.x * starter
    const startingY = pixel.y * triangleHeight

    const evenRow = pixel.y % 2 === 0
    const evenCol = pixel.x % 2 === 0

    ctx.beginPath()

    if ((evenRow && evenCol) || (!evenRow && !evenCol) ) {
      ctx.moveTo(startingX, startingY)
      ctx.lineTo(startingX - starter, startingY+triangleHeight)
      ctx.lineTo(startingX + starter, startingY+triangleHeight)
      ctx.lineTo(startingX, startingY)
    } else {
      ctx.moveTo(startingX, startingY + triangleHeight)
      ctx.lineTo(startingX-starter, startingY)
      ctx.lineTo(startingX+starter, startingY)
      ctx.lineTo(startingX, startingY + triangleHeight)
    }

    ctx.closePath()

    this.fillPixelWithPalette(ctx, pixel, palette)
  }
}