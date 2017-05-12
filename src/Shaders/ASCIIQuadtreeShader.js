import QuadtreeShader from './QuadtreeShader.js'
import tinycolor from 'tinycolor2'

import { shuffle } from '../Utils.js'

/**
* Quadtree shader
*/
export default class ASCIIQuadtreeShader extends QuadtreeShader {
  
  constructor (name) {
    super(name || "ASCII Quadtree")

    this.patterns = [
      ".:+<#"
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

    const frameCharacters = shuffle(this.patterns)[0].split('')
    frameCharacters.reverse()

    this.characters = frameCharacters
  }

  renderQuad(ctx, quad) {

    const luminance = tinycolor(quad.fill).getLuminance()
    const characterIndex = (this.characters.length - 1) - Math.round(luminance * (this.characters.length - 1))
    const character = this.characters[characterIndex]

    ctx.font = this.fontFromSize(quad.h)

    ctx.fillStyle = quad.fill;
    ctx.strokeStyle = quad.fill;

    this.fillText(ctx, character, quad.x + .2 * quad.w, quad.y + quad.h*0.85)
    
    if (!this.shouldFill() && this.shouldStroke()) {
      this.strokeText(ctx, character, quad.x + .2 * quad.w, quad.y + quad.h*0.85, quad)
    }
  }

  fillText (ctx, character, x, y) {
    if (this.shouldFill()) {
      ctx.fillText(character, x, y)
    }
  }

  strokeText (ctx, character, x, y, quad) {
    
    if (!this.shouldFill()) {
      ctx.lineWidth = Math.max(1.5, Math.floor(quad.w/25))
    } else {
      ctx.lineWidth = 1
    }

    if (this.shouldStroke()) {
      ctx.strokeText(character, x, y)
    }
  }
}