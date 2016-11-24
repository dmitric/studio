import Palette from './Palette.js'

/**
* A basic rule Palette which allows you to pass 
* a set of rules that will test properties of the
* pixel and decide what color it should be
*/
export default class RulePalette extends Palette {

  constructor (name, rules) {
    super(name)
    this.rules = rules || []
  }

  getColorFromPixel (pixel) {
    let color = pixel.color
    
    this.rules.some((rule) => {
      let result = rule.test(pixel)
      
      if (result) {
        color = rule.color
      }

      return result
    })

    return color
  }
}

/**
* helper function to generate rule palettes based on a property,
* by default brightness
*/
export function stepColorPalette(paletteName, colors, intervals, property) {
  let steps = []
  
  property = property || "brightness"
  
  if (colors.length !== intervals.length) {
    throw new Error("Colors and brightness list should be same length")
  }

  for (var i=0; i < colors.length; i++) {
    (function (i) {
      steps.push({
          color: colors[i],
          test: function (info) {
            return info[property] < intervals[i]
          }
      })
    })(i)
  }
  return new RulePalette(paletteName, steps)
}
