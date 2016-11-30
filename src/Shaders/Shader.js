/**
* Base class for shaders.
* Any class that extends the shader should
* implement it's own renderPixel method
*/
export default class Shader {
  constructor (name) {
    this.name = name
    this.options = {}
    this.horizontalSkip = 1
    this.verticalSkip = 1
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
    
    data.pixelGrid.forEach(pixelRow => {
      pixelRow.forEach(pixel => {
        this.renderPixel(ctx, pixel, data, palette)
      })
    })

    this.finish(ctx, data, palette)
  }

  finish (ctx, data, palette) {

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