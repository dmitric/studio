import QuadtreeShader from './QuadtreeShader.js'

/**
* Quadtree shader
*/
export default class SplitQuadtreeShader extends QuadtreeShader {
  
  constructor (name) {
    super(name || "Split Quadtree")
  }


  split (quad) {
    if (quad.leaf) {
      return;
    }

    var index = this.quads.indexOf(quad);
    this.quads.splice(index, 1);
    var w = quad.w / 2;
    var h = quad.h / 2;
    var x1 = quad.x;
    var x2 = quad.x + w;
    var y1 = quad.y;
    var y2 = quad.y + h;

    if (Math.random() >= 0.5) {
      this.quads.push(this.createQuad(x1, y1, w, h, quad.fill));
      this.quads.push(this.createQuad(x2, y1, w, h, quad.fill));
      this.quads.push(this.createQuad(x1, y2, w, h, quad.fill));
      this.quads.push(this.createQuad(x2, y2, w, h, quad.fill));
    } else {
      if (quad.h === quad.w) {
        if (Math.random() >= 0.5) {
          this.quads.push(this.createQuad(quad.x, quad.y, quad.w, quad.h/2, quad.fill));
          this.quads.push(this.createQuad(quad.x, quad.y + quad.h/2, quad.w, quad.h/2, quad.fill));
        } else {
          this.quads.push(this.createQuad(quad.x, quad.y, quad.w/2, quad.h, quad.fill));
          this.quads.push(this.createQuad(quad.x + quad.w/2, quad.y, quad.w/2, quad.h, quad.fill));
        }
      } else if (quad.h > quad.w) {
        this.quads.push(this.createQuad(quad.x, quad.y, quad.w, quad.h/2, quad.fill));
        this.quads.push(this.createQuad(quad.x, quad.y + quad.h/2, quad.w, quad.h/2, quad.fill));
      } else {
        this.quads.push(this.createQuad(quad.x, quad.y, quad.w/2, quad.h, quad.fill));
        this.quads.push(this.createQuad(quad.x + quad.w/2, quad.y, quad.w/2, quad.h, quad.fill));
      }
    }
  }

}