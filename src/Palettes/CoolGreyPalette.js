import Palette from "./Palette.js"

import tinycolor from 'tinycolor2'

export default class GreyscalePalette extends Palette {
  constructor(name) {
    super(name || 'Cool Grey')
    this.backgroundColor = 'rgb(195, 195, 195)'
  }

  getColorFromPixel(pixel) {
  	if (pixel.brightness < 0.85) {
    	return pixel.greyscale || tinycolor(pixel.color).greyscale().toString()
		} else {
			return 'rgb(180, 180, 180)'
		}
  }
}