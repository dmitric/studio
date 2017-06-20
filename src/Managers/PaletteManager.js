import ItemManager from './ItemManager.js'
import Palette from '../Palettes/Palette.js'
import { stepColorPalette } from '../Palettes/RulePalette.js'
import GreyscalePalette from '../Palettes/GreyscalePalette.js'
import CoolGreyPalette from '../Palettes/CoolGreyPalette.js'

/**
* PaletteManager
*/
export default class PaletteManager extends ItemManager {
  static defaultItems () {
    return [
      new Palette('Normal'),
      new GreyscalePalette('Greyscale'),
      stepColorPalette('Red Pink',
        ['#111', 'red', '#BF384F', '#FF69B4', 'white'],
        [0.1, 0.15, 0.25, 0.4, 100]),
      stepColorPalette('Yellow Blue',
        ['transparent', '#000316', '#336699', '#D0AC11', '#F5F1DE'],
        [0.1, 0.15, 0.25, 0.4, 100]),
      stepColorPalette('Blue Scales',
        ['#3b5998', '#8b9dc3', '#dfe3ee', '#f7f7f7', 'white'],
        [0.1, 0.15, 0.25, 0.4, 100]),
      stepColorPalette('Purple Rain',
        ['#090208','#291f43','#3f355c','#4c4e88','#797db1', 'white'],
        [0.1, 0.20, 0.35, 0.45, 0.6, 100]),
      stepColorPalette('Pop',
        ['#2c2615', '#ffed02', '#ea6cbc', '#eecccd', '#ffffff'],
        [0.1, 0.15, 0.25, 0.4, 100]),
      stepColorPalette('Autumn',
        ['#6a231e','#c92f23','#fe8867','#ffc564','#fef4aa', '#fef9d4', '#fefbe5', 'white'],
        [0.1, 0.15, 0.25, 0.4, 0.5, 0.6, 0.7, 100]),
      stepColorPalette('Icon Like',
        ['#3e0e04', '#c5522b', '#0691da', '#fab715', '#fde3d5'],
        [0.08, 0.20, 0.25, 0.4, 100], '#fde3d5'),
      stepColorPalette('RBW',
        ['transparent', 'red', 'white', 'transparent'],
        [0.08, 0.25, 0.65, 100]),
      new CoolGreyPalette('Cool Grey'),
      stepColorPalette('Black Yellow',
        ['#120501','#72595c','#988084','#daa878','#fece66', '#fdeac0'],
        [0.08, 0.20, 0.25, 0.4, 0.7, 100]),
      stepColorPalette('Arrows',
        ['#3D362E', '#448075' , '#AF4444', '#E9FFC7',  '#7EEDAC', 'white'],
        [0.08, 0.20, 0.25, 0.4, 0.7, 100]),
      stepColorPalette('Mondrian',
        ["#1a1511", "#5e4cbc", "#f64e33", "#ffef06", "#d4d8e1", "#f1fbfd"],
        [0.08, 0.20, 0.25, 0.4, 0.7, 100], '#f1fbfd'),
      stepColorPalette('Off White and Black',
        ['#111', '#EBF4EF'], [0.5, 100], '#EBF4EF')
    ]
  }
}
