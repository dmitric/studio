/**
* Base Palette
*/
export default class Palette {
  constructor (name, backgroundColor) {
    this.name = name || "Palette"
    this.backgroundColor = backgroundColor
  }

  getColorFromPixel (pixel) {
    return pixel.color
  }
  
  getBorderColorFromPixel(pixel) {
    return this.getColorFromPixel(pixel)
  }
}