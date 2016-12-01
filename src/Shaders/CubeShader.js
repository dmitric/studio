import Shader from './Shader.js'

export default class CubeShader extends Shader {
  
  constructor (name) {
    super(name || "Cubes")
  }

  renderPixel (ctx, pixel, data, palette) {
    var blockWidth = data.blockDimension*2
    var blockHeight = blockWidth

    var shiftWidth = blockWidth/2
    var pointHeight = data.blockDimension/2.5

    let startingX, startingY

    ctx.beginPath()
    
    if (pixel.y % 2 === 0) {
      // even rows, every other pixel
      startingX = shiftWidth * pixel.x
      startingY = blockHeight * pixel.y/2

      if (pixel.x % 2 === 0) {
        // draw top
        //   /\
        //   \/ 

        if (pixel.y/4 % 1 === 0) {
          startingX -= shiftWidth
        }

        ctx.moveTo(startingX, startingY)
        ctx.lineTo(startingX + shiftWidth, startingY - pointHeight)
        ctx.lineTo(startingX + blockWidth, startingY)
        ctx.lineTo(startingX + shiftWidth, startingY + pointHeight)
        ctx.lineTo(startingX, startingY)
      }
      
    } else {

      startingX = shiftWidth * pixel.x
      startingY = (blockHeight) * (pixel.y - 1)/2

      if ((pixel.y+1)/4 % 1 !== 0) {
        startingX -= shiftWidth
      }

      if (pixel.x % 2 === 0) {
        ctx.moveTo(startingX, startingY)
        ctx.lineTo(startingX + shiftWidth, startingY + pointHeight)
        ctx.lineTo(startingX + shiftWidth, startingY + blockHeight)
        ctx.lineTo(startingX, startingY + blockHeight-pointHeight)
        ctx.lineTo(startingX, startingY)

        // draw left
        //   |\
        //    \|
      } else {
        ctx.moveTo(startingX, startingY + pointHeight)
        ctx.lineTo(startingX + shiftWidth, startingY)
        ctx.lineTo(startingX + shiftWidth, startingY + blockHeight- pointHeight)
        ctx.lineTo(startingX, startingY + blockHeight)
        ctx.lineTo(startingX, startingY + pointHeight)

        // draw right
        //    /|
        //    |/
      }
    }

    ctx.closePath()

    this.fillPixelWithPalette(ctx, pixel, palette)
  }
}
