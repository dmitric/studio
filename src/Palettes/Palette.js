/**
* Base Palette
*/
export default class Palette {
  constructor (name) {
    this.name = name || "Palette"
  }

  getColorFromPixel (pixel) {
    return pixel.color
  }
  
  getBorderColorFromPixel(pixel) {
    return this.getColorFromPixel(pixel)
  }
}