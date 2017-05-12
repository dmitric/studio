import Shader from './Shader.js'

import _ from 'lodash'

/**
* Quadtree shader
*/
export default class QuadtreeShader extends Shader {
  
  constructor (name) {
    super(name || "Quadtree")
    this.quads = []
    this.leafSize = 4;
    this.areaPower = 0.25;
    this.prepCtx = null;
    this.id = 0;
  }

  prepare (ctx, data, palette) {
    var canvas = document.createElement('canvas');
    canvas.width = data.blockDimension * data.columnCount * this.horizontalSkip
    canvas.height = data.blockDimension * data.rowCount * this.verticalSkip
    this.prepCtx = canvas.getContext('2d')
    this.quads = []
    this.leafSize = data.blockDimension/8;
  }

  renderPixel (ctx, pixel, data, palette) {
    this.prepCtx.beginPath()
      
    this.prepCtx.rect(
      pixel.x*data.blockDimension,
      pixel.y*data.blockDimension,
      data.blockDimension,
      data.blockDimension
    )
    
    this.prepCtx.closePath()

    this.forcefillPixelWithPalette(this.prepCtx, pixel, palette)
  }

  forcefillPixelWithPalette(ctx, pixel, palette) {
    this.forcefillPixelWithColor(
      ctx,
      palette.getColorFromPixel(pixel),
      palette.getBorderColorFromPixel(pixel)
    )
  }

  forcefillPixelWithColor(ctx, fillColor, borderColor) {
    ctx.fillStyle = fillColor
    ctx.fill()
  }

  renderQuad(ctx, quad) {
    ctx.beginPath()
      
    this.drawQuadShape(ctx, quad)

    ctx.closePath()

    ctx.fillStyle = quad.fill;
    ctx.strokeStyle = quad.fill;

    this.fill(ctx)
    
    if (!this.shouldFill() && this.shouldStroke()) {
      this.stroke(ctx)
    }
  }

  drawQuadShape(ctx, quad) {
    ctx.rect(
      quad.x,
      quad.y,
      quad.w,
      quad.h
    )
  }

  finish(ctx, data, palette) {
    this.quads.push(this.createQuad(0, 0,
      data.blockDimension * data.columnCount * this.horizontalSkip,
      data.blockDimension * data.rowCount * this.verticalSkip, "#000000"));

    
    for (let d=0; d < 5 * data.columnCount; d++){
      this.step();
    }

    this.quads.forEach(quad => {
      if (quad.fill !== quad.previousFill){
        this.renderQuad(ctx, quad)
      }
    })

  }

  step () {
    var items = this.quads.filter(function(x) {
      return !x.leaf;
    });

    var quad = _.minBy(items, function(x) {
        return x.score;
    });

    this.split(quad)
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

    this.quads.push(this.createQuad(x1, y1, w, h, quad.fill));
    this.quads.push(this.createQuad(x2, y1, w, h, quad.fill));
    this.quads.push(this.createQuad(x1, y2, w, h, quad.fill));
    this.quads.push(this.createQuad(x2, y2, w, h, quad.fill));
  }

  createQuad(x, y, w, h, previousFill) {
    var c = this.computeColor(x, y, w, h);
    var error = c[3];
    var score = -error * Math.pow(w * h, this.areaPower);
    var color = 16777216 + (c[0] << 16) + (c[1] << 8) + c[2];
    var fill = '#' + color.toString(16).substring(1);
    var leaf = w <= this.leafSize || h <= this.leafSize;
    return {
        x: x, y: y, w: w, h: h,
        fill: fill, leaf: leaf, score: score,
        previousFill: previousFill
    }
  }

  computeHistogram(x, y, w, h) {
    var data = this.prepCtx.getImageData(x, y, w, h).data;
    var result = [];
    for (var i = 0; i < 1024; i++) {
      result.push(0);
    }
    for (i = 0; i < data.length; i++) {
      result[(i % 4) * 256 + data[i]]++;
    }
    return result;
  }

  weightedAverage(hist) {
    var total = 0;
    var value = 0;
    for (var i = 0; i < 256; i++) {
        total += hist[i];
        value += hist[i] * i;
    }
    value /= total;
    var error = 0;
    for (i = 0; i < 256; i++) {
        error += (value - i) * (value - i) * hist[i];
    }
    error = Math.sqrt(error / total);
    return [value, error];
  }

  colorFromHistogram(hist) {
    var c1 = this.weightedAverage(hist.slice(0, 256));
    var c2 = this.weightedAverage(hist.slice(256, 512));
    var c3 = this.weightedAverage(hist.slice(512, 768));
    var r = Math.round(c1[0]);
    var g = Math.round(c2[0]);
    var b = Math.round(c3[0]);
    var e = c1[1] * 0.2989 + c2[1] * 0.5870 + c3[1] * 0.1140;
    return [r, g, b, e];
  }

  computeColor(x, y, w, h) {
    return this.colorFromHistogram(this.computeHistogram(x, y, w, h));
  }
}