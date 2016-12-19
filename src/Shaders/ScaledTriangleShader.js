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
    // we have twice as much space as the triangles are interlocking
    const blockWidth = data.blockDimension * 2

    // scale down height based on brightness
    var triangleDimension = blockWidth * Math.max(Math.min(1-pixel.brightness, 0.75), 0)

    // we start the triangle every dimension / 2 because they interlace 
    var starter = triangleDimension / 2

    var startingX = pixel.x * data.blockDimension

    // center it vertically
    var startingY = pixel.y * blockWidth + (blockWidth - triangleDimension)/2

    const evenRow = pixel.y % 2 === 0
    const evenCol = pixel.x % 2 === 0

    ctx.beginPath()

    if ((evenRow && evenCol) || (!evenRow && !evenCol) ) {
      
      //  Point at the top
      //
      //       /\
      //      /__\
      //

      ctx.moveTo(startingX, startingY)
      ctx.lineTo(startingX - starter, startingY + triangleDimension)
      ctx.lineTo(startingX + starter, startingY + triangleDimension)
      ctx.lineTo(startingX, startingY)
    } else {
      
      //  Point at the bottom
      //     ____
      //     \  /
      //      \/
      //

      ctx.moveTo(startingX, startingY + triangleDimension)
      ctx.lineTo(startingX - starter, startingY)
      ctx.lineTo(startingX + starter, startingY)
      ctx.lineTo(startingX, startingY + triangleDimension)
    }

    ctx.closePath()

    this.fillPixelWithPalette(ctx, pixel, palette)
  }

}