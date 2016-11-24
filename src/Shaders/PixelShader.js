import Shader from './Shader.js'

/**
* Basic PixelShader
*/
export default class PixelShader extends Shader {
	
	constructor (name) {
		super(name || "Pixel")
	}

  renderPixel(ctx, pixel, data, palette) {
    ctx.beginPath();
      
    ctx.rect(
      pixel.x*data.blockDimension,
      pixel.y*data.blockDimension,
      data.blockDimension,
      data.blockDimension
    )
    
    ctx.closePath();

    ctx.fillStyle = palette.getColorFromPixel(pixel);
    ctx.strokeStyle = palette.getBorderColorFromPixel(pixel);

    ctx.fill()
    ctx.stroke()
	}
}