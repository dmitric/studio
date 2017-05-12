import QuadtreeShader from './QuadtreeShader.js'

/**
* Quadtree shader
*/
export default class CircleQuadtreeShader extends QuadtreeShader {
  
  constructor (name) {
    super(name || "Circle Quadtree")
  }

  drawQuadShape(ctx, quad) {
    ctx.arc(
      (quad.x + quad.w/2),
      (quad.y + quad.h/2),
      Math.min(quad.w, quad.h)/2 * 0.90,
      0, 2 * Math.PI, false
    )
  }
}