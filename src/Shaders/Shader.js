/**
* Base class for shaders.
* Any class that extends the shader should
* implement it's own renderPixel method
*/
export default class Shader {
  constructor (name) {
    this.name = name
  }

  prepare (ctx, data, palette) {

  }

  render (ctx, data, palette) {
    this.prepare(ctx, data, palette)
    
    data.pixels.forEach((pixel) => {
      this.renderPixel(ctx, pixel, data, palette)
    })
  }

  renderPixel(ctx, pixel, data, palette) {
    // no op
  }
}