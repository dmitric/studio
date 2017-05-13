import SplitQuadtreeShader from './SplitQuadtreeShader.js'

/**
* Quadtree shader
*/
export default class CrossSplitQuadtreeShader extends SplitQuadtreeShader {
  
  constructor (name) {
    super(name || "X Split Quadtree")
  }

  renderQuad(ctx, quad) {

    ctx.beginPath()

    ctx.moveTo(quad.x, quad.y)
    ctx.lineTo(quad.x+quad.w, quad.y+quad.h)
    
    ctx.moveTo(quad.x+quad.w, quad.y)
    ctx.lineTo(quad.x, quad.y+quad.h)
    
    ctx.closePath()

    ctx.fillStyle = quad.fill
    ctx.strokeStyle = quad.fill

    //this.fill(ctx)
    this.fill(ctx)
    this.stroke(ctx)
  }

}