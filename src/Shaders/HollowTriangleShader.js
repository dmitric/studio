import EquilateralTriangleShader from './EquilateralTriangleShader.js'

export default class HollowTriangleShader extends EquilateralTriangleShader {
  
  constructor (name) {
    super(name || "Hollow Triangles")
  }

  renderPixel (ctx, pixel, data, palette) {
    
    //Draw outer triangle
    super.renderPixel(ctx, pixel, data, palette)

    const blockWidth = data.blockDimension * 2

    // scale down height based on brightness
    var triangleDimension = blockWidth * Math.max(Math.min(1-pixel.brightness, 0.75), 0)

    // we start the triangle every dimension / 2 because they interlace 
    var starter = triangleDimension / 2

    var startingX = pixel.x * data.blockDimension

    const evenRow = pixel.y % 2 === 0
    const evenCol = pixel.x % 2 === 0

    ctx.beginPath()

    let startingY

    if ((evenRow && evenCol) || (!evenRow && !evenCol) ) {
      
      //  Point at the top
      //
      //       /\
      //      /__\
      //

      startingY = pixel.y * blockWidth + (blockWidth - triangleDimension)/ Math.sqrt(3)

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

      startingY = pixel.y * blockWidth + (blockWidth - triangleDimension)/4

      ctx.moveTo(startingX, startingY + triangleDimension)
      ctx.lineTo(startingX - starter, startingY)
      ctx.lineTo(startingX + starter, startingY)
      ctx.lineTo(startingX, startingY + triangleDimension)
    }

    ctx.closePath()

    this.fillPixelWithColor(ctx, palette.backgroundColor || this.options.defaultColor, palette.getColorFromPixel(pixel))
  }
}