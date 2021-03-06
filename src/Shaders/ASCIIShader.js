import Shader from './Shader.js'

import { shuffle } from '../Utils.js'

/**
* ASCIIShader
*/
export default class ASCIIShader extends Shader {
  
  constructor (name) {
    super(name || "ASCII")
    
    this.verticalSkip = 2
    
    this.patterns = [
      ".:+<#",
      "X^&<",
      ".:+<@",
      "^[*]$",
      "**,:/@",
      ".'~:;!>+=",
      "*#",
      ".:coCO8@",
      './+|\\',
      ".:13",
      ".*V$#"
    ]
  }

  fontFromSize (fontSize) {
    return `${fontSize}px Courier`
  }

  estimateWidthOfCharacter (ctx) {
    return Math.floor(ctx.measureText(" ").width)
  }

  prepare (ctx, data, palette) {
    super.prepare(ctx, data, palette)
    
    ctx.miterLimit = 2

    let fontSize = 1

    ctx.font = this.fontFromSize(fontSize)
    
    this.estimatedWidth = this.estimateWidthOfCharacter(ctx)

    while (this.estimatedWidth < data.blockDimension) {
      
      fontSize += 0.5
      
      ctx.font = this.fontFromSize(fontSize)

      let newEstimatedWidth = this.estimateWidthOfCharacter(ctx)

      let bigEnough = newEstimatedWidth > data.blockDimension && Math.abs(newEstimatedWidth - data.blockDimension) >= 1
      
      if (!bigEnough) {
        this.estimatedWidth = newEstimatedWidth
      } else {
        break
      }
    }

    const frameCharacters = shuffle(this.patterns)[0].split('')
    frameCharacters.reverse()

    this.characters = frameCharacters
  }

  renderPixel (ctx, pixel, data, palette) {

    const characterIndex = (this.characters.length - 1) - Math.round(pixel.brightness * (this.characters.length - 1))
    const character = this.characters[characterIndex]

    const position = {
      x: pixel.x * data.blockDimension,
      y: data.blockDimension * (2 * pixel.y + 1.5)
    }

    ctx.fillStyle = palette.getColorFromPixel(pixel)
    ctx.strokeStyle = palette.getBorderColorFromPixel(pixel)
    
    
    this.fillText(ctx, character, position.x, position.y)
    this.strokeText(ctx, character, position.x, position.y)

  }

  fillText (ctx, character, x, y) {
    if (this.shouldFill()) {
      ctx.fillText(character, x, y)
    }
  }

  strokeText (ctx, character, x, y) {
    
    if (!this.shouldFill()) {
      ctx.lineWidth = Math.max(1.5, Math.floor(this.options.blockDimension/25))
    } else {
      ctx.lineWidth = 1
    }

    if (this.shouldStroke()) {
      ctx.strokeText(character, x, y)
    }
  }
}
