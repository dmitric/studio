import Shader from './Shader.js'

/**
* Basic PixelShader
*/
export default class PixelShader extends Shader {
  
  constructor (name) {
    super(name || "Pixel")
  }

  renderPixel (ctx, pixel, data, palette) {
    ctx.beginPath();
      
    ctx.rect(
      pixel.x*data.blockDimension,
      pixel.y*data.blockDimension,
      data.blockDimension,
      data.blockDimension
    )
    
    ctx.closePath()

    this.fillPixelWithPalette(ctx, pixel, palette)

  }
}