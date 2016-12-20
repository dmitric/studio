import Shader from './Shader.js'

export default class StarsAndBarsShader extends Shader {
  
  constructor (name) {
    super(name || "Stars and Bars")
  }

  drawStar(ctx, x, y, r, p, m) {
    ctx.save()
    ctx.beginPath()
    ctx.translate(x, y)
    ctx.moveTo(0,0-r)

    for (let i = 0; i < p; i++) {
      ctx.rotate(Math.PI / p)
      ctx.lineTo(0, 0 - (r*m))
      ctx.rotate(Math.PI / p)
      ctx.lineTo(0, 0 - r)
    }

    this.fill(ctx)
    ctx.restore()
  }

  prepare (ctx, data, palette) {
    super.prepare(ctx, data, palette)

    for (var stripeIndex = 0; stripeIndex < data.rowCount; stripeIndex++) {
      ctx.beginPath()
      
      ctx.rect(0, stripeIndex*data.blockDimension, data.columnCount * data.blockDimension, data.blockDimension)
      
      ctx.fillStyle = stripeIndex % 2 === 0? "rgb(187, 19, 62)" : "white"
      ctx.strokeStyle = ctx.fillStyle
      
      this.fill(ctx)
      this.stroke(ctx)
    }
  }

  renderPixel (ctx, pixel, data, palette) {
    if (pixel.brightness > 0.3) {
      ctx.beginPath()
      
      ctx.rect(pixel.x*data.blockDimension,
        pixel.y*data.blockDimension,
        data.blockDimension, data.blockDimension)
      
      ctx.fillStyle = "rgb(0, 33, 71)";
      ctx.strokeStyle = ctx.fillStyle;
      
      this.fill(ctx)
      this.stroke(ctx)

      this.drawStar(ctx, (pixel.x+0.5)*data.blockDimension, (0.5+ pixel.y)*data.blockDimension, data.blockDimension*0.3, 5, 0.4)
      
      ctx.fillStyle = "white"
      ctx.strokeStyle = "white"
      
      this.fill(ctx)
      this.stroke(ctx)
    }
  }
}