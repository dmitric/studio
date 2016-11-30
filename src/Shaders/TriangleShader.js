import Shader from './Shader.js'

export default class TriangleShader extends Shader {
  
  constructor (name) {
    super(name || "Triangles")
  }

  renderPixel (ctx, pixel, data, palette) {
    ctx.beginPath()
    
    var starter = data.blockDimension

    var triangleWidth = starter * 2

    var triangleHeight = data.blockDimension

    var startingX = pixel.x * starter
    var startingY = pixel.y*triangleHeight
    
    if (pixel.x % 2 === 0) {
      ctx.moveTo(startingX, startingY)
      ctx.lineTo(startingX, startingY+triangleHeight)
      ctx.lineTo(startingX + triangleWidth, startingY + triangleHeight)
      ctx.lineTo(startingX, startingY)
    } else {
      ctx.moveTo(startingX+starter, startingY)
      ctx.lineTo(startingX+starter - triangleWidth, startingY)
      ctx.lineTo(startingX+starter, startingY + triangleHeight)
      ctx.lineTo(startingX+starter, startingY)
    }

    ctx.closePath()

    this.fillPixelWithPalette(ctx, pixel, palette)
  }
}