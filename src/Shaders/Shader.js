/**
* Base class for shaders.
* Any class that extends the shader should
* implement it's own renderPixel method
*/
export default class Shader {
  constructor (name) {
    this.name = name
  }

  renderPixel(ctx, pixel, data, palette) {
    // no op
  }

  render (ctx, data, palette) {
    data.pixels.forEach((pixel) => {
      this.renderPixel(ctx, pixel, data, palette)
    })
  }
}