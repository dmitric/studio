import Shader from './Shader.js'

/**
* ScaledTriangle
*/
export default class ScaledTriangleShader extends Shader {
  
  constructor (name) {
    super(name || "Scaled Triangles")
    this.verticalSkip = 2
  }

  renderPixel (ctx, pixel, data, palette) {
    
    const blockWidth = data.blockDimension*2

    var triangleWidth = blockWidth

    var starter = triangleWidth/2

    var triangleHeight = triangleWidth

    var startingX = (pixel.x)*starter
    var startingY = pixel.y*triangleHeight

    triangleHeight *= Math.min(1-pixel.brightness, 0.75)
    triangleWidth = triangleHeight

    starter = triangleWidth / 2

    startingY += (blockWidth - starter*2)

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