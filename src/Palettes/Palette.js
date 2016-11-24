/**
* Base Palette
*/
export default class Palette {
  constructor (name) {
    this.name = name || "Palette"
  }

  getColorFromPixel (frame) {
    return frame.color
  }
  
  getBorderColorFromPixel(frame) {
    return this.getColorFromPixel(frame)
  }
}