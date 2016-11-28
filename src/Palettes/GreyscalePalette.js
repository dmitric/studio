import Palette from "./Palette.js"

export default class GreyscalePalette extends Palette {
  constructor(name) {
    super(name || 'Greyscale')
  }

  getColorFromPixel(pixel) {
    return pixel.greyscale
  }
}