import Palette from "./Palette.js"

import tinycolor from 'tinycolor2'

export default class GreyscalePalette extends Palette {
  constructor(name) {
    super(name || 'Greyscale')
    //this.backgroundColor = 'rgb(195, 195, 195)'
  }

  getColorFromPixel(pixel) {
    return pixel.greyscale || tinycolor(pixel.color).greyscale().toString()
  }
}