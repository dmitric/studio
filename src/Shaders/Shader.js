/**
* Base class for shaders.
* Any class that extends the shader should
* implement it's own render or renderPixel method,
* and has the ability to implement it's own prepare
* or finish methods to perform actions before
* and after rendering pixels
*/

export default class Shader {
  constructor (name) {
    this.name = name
    this.options = {}
    this.horizontalSkip = 1
    this.verticalSkip = 1
    this.canFill = true
  }

  configure (options) {
    this.options = options
  }

  prepare (ctx, data, palette) {
    ctx.lineWidth = 1
    
    if (palette.backgroundColor) {
      ctx.fillStyle = palette.backgroundColor
      ctx.fillRect(0, 0,
        data.blockDimension * data.columnCount * this.horizontalSkip,
        data.blockDimension * data.rowCount * this.verticalSkip)
    }
  }

  render (ctx, data, palette) {
    this.prepare(ctx, data, palette)
    
    for (let ri=0; ri < data.rowCount; ri ++) {
      for (let ci=0; ci < data.columnCount; ci ++) {
        this.renderPixel(ctx, data.pixelGrid[ci][ri], data, palette)
      }
    }
    
    this.finish(ctx, data, palette)
  }

  finish (ctx, data, palette) {
    // no op
  }

  renderPixel (ctx, pixel, data, palette) {
    // no op
  }

  fillPixelWithPalette(ctx, pixel, palette) {
    this.fillPixelWithColor(
      ctx,
      palette.getColorFromPixel(pixel),
      palette.getBorderColorFromPixel(pixel)
    )
  }

  fillPixelWithColor(ctx, fillColor, borderColor) {
    ctx.fillStyle = fillColor
    ctx.strokeStyle = borderColor

    ctx.fill()
    ctx.stroke()
  }
}
