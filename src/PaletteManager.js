import ItemManager from './ItemManager.js'
import Palette from './Palettes/Palette.js'
import { stepColorPalette } from './Palettes/RulePalette.js'
import GreyscalePalette from './Palettes/GreyscalePalette.js'

/**
* PaletteManager
*/
export default class PaletteManager extends ItemManager {
  static defaultItems () {
    return [
      new Palette('Normal'),
      new GreyscalePalette('Greyscale'),
      stepColorPalette("Red Pink",
        ["#111", "red", "#BF384F", "#FF69B4", "white"],
        [0.1, 0.15, 0.25, 0.4, 100]),
      stepColorPalette("Yellow Blue",
        ["transparent", "#000316", "#336699", "#D0AC11", "#F5F1DE"],
        [0.1, 0.15, 0.25, 0.4, 100])
    ]
  }
}
