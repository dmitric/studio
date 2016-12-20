import Shader from './Shader.js'
import tinycolor from 'tinycolor2'
import { randomIntFromInterval } from '../Utils.js'

/**
* Glitch Shader
*/
export default class GlitchShader extends Shader {
  
  constructor (name) {
    super(name || "Glitch")
  }

  renderPixel (ctx, pixel, data, palette) {

    ctx.save()

    ctx.translate(
      pixel.x * data.blockDimension,
      pixel.y * data.blockDimension
    )

    const col = tinycolor(palette.getColorFromPixel(pixel))

    const saturatedCol = col.saturate(60)

    if (pixel.brightness < 0.70) {
      ctx.beginPath()
      
      ctx.rect(0,0, data.blockDimension, data.blockDimension)

      ctx.closePath()

      ctx.fillStyle = saturatedCol.toString()
      ctx.strokeStyle = ctx.fillStyle

      this.fill(ctx)
      
      if (this.shouldFill()) {
        this.stroke(ctx)
      }

      let x = 0
      let y = 0

      const bitsize = data.blockDimension/4

      for (let pixs = 0; pixs < randomIntFromInterval(0, 3); pixs ++) {
        x = randomIntFromInterval(0, (data.blockDimension - bitsize)/bitsize)*bitsize
        y = randomIntFromInterval(0, (data.blockDimension - bitsize)/bitsize)*bitsize

        let fillCol = saturatedCol.brighten(randomIntFromInterval(0, 30))

        ctx.beginPath()
        ctx.rect(x, y, bitsize, bitsize)
        //ctx.arc(x+bitsize/2,y+bitsize/2, bitsize/2, 0, Math.PI*2, false)
        ctx.closePath()

        ctx.fillStyle = fillCol.toString()
        ctx.strokeStyle = ctx.fillStyle
        this.fill(ctx)

        if (!this.shouldFill()){
          this.stroke(ctx)
        }

        if (x+2*bitsize < data.blockDimension) {
          ctx.beginPath()
          ctx.rect(x+2*bitsize, y, bitsize, bitsize)
          ctx.closePath()

          let col1 = tinycolor.mix(fillCol, "#f5f5f5", 20)

          ctx.fillStyle = col1.toString()
          ctx.strokeStyle = ctx.fillStyle
          
          this.fill(ctx)
          
          if (!this.shouldFill()){
            this.stroke(ctx)
          }
        }

        if (y+2*bitsize < data.blockDimension) {

          ctx.beginPath()
          ctx.rect(x+bitsize, y+2*bitsize, bitsize, bitsize)
          ctx.closePath()

          let col2 = tinycolor.mix(fillCol, "#f5f5f5", 10)

          ctx.fillStyle = col2.toString()
          ctx.strokeStyle = ctx.fillStyle
          
          this.fill(ctx)

          if (!this.shouldFill()) {
            this.stroke(ctx)
          }
        }
      }
    }
    ctx.restore()
  }

  finish (ctx, data, palette) {
    const canvas = ctx.canvas

    let
      // cache the width and height of the canvas locally
      x, y, w = canvas.width, h = canvas.height,

      // _len is an iterator limit, initially storing the number of slices
      // to create
      i, _len = randomIntFromInterval(1,6),

      // pick a random amount to offset the color channel
      channelOffset = (randomIntFromInterval(-_len*2, _len*2) * w * + randomIntFromInterval(-_len, _len)) * 4,

      // the maximum amount to offset a chunk of the image is a function of its width
      maxOffset = _len * _len / 100 * w,

      // vars for the width and height of the chunk that gets offset
      chunkWidth, chunkHeight,

      // create a temporary canvas to hold the image we're working on
      tempCanvas = document.createElement("canvas"),
      tempCtx = tempCanvas.getContext("2d"),

      srcData, targetImageData, pixelData

    // set the dimensions of the working canvas
    tempCanvas.width = w
    tempCanvas.height = h

    // draw the initial image onto the working canvas
    tempCtx.drawImage(canvas, 0, 0, w, h)

    // store the data of the original image for use when offsetting a channel
    srcData = tempCtx.getImageData(0, 0, w, h).data

    // randomly offset slices horizontally
    for (i = 0; i < _len; i++) {

      // pick a random y coordinate to slice at
      y = randomIntFromInterval(0, h)

      // pick a random height of the slice
      chunkHeight = Math.min(randomIntFromInterval(1, h / 4), h - y)

      // pick a random horizontal distance to offset the slice
      x = randomIntFromInterval(1, maxOffset)
      chunkWidth = w - x

      // draw the first chunk
      tempCtx.drawImage(canvas,
        0, y, chunkWidth, chunkHeight,
        x, y, chunkWidth, chunkHeight)

      // draw the rest
      tempCtx.drawImage(canvas,
        chunkWidth, y, x, chunkHeight,
        0, y, x, chunkHeight)
    }

    // get hold of the ImageData for the working image
    targetImageData = tempCtx.getImageData(0, 0, w, h)

    // and get a local reference to the rgba data array
    pixelData = targetImageData.data

    // Copy a random color channel from the original image into
    // the working canvas, offsetting it by a random amount
    //
    // ImageData arrays are a single dimension array that contains
    // 4 values for each pixel.
    // so, by initializing `i` to a random number between 0 and 2,
    // and incrementing by 4 on each iteration, we can replace only
    // a single channel in the image
    for(i = randomIntFromInterval(0, 3), _len = srcData.length; i < _len; i += 4) {
      pixelData[i+channelOffset] = srcData[i];
    }

    // Make the image brighter by doubling the rgb values
    for(i = 0; i < _len; i++) {
      pixelData[i++] *= 2
      pixelData[i++] *= 2
      pixelData[i++] *= 2
    }

    // TODO: The above loops are the most costly in this function, iterating
    // over all the pixels in the image twice.
    // It maybe possible to optimize this by combining both loops into one,
    // and only processing every other line, as alternate lines are replaced
    // with black in the 'scan lines' block belop

    // copy the tweaked ImageData back into the context
    tempCtx.putImageData(targetImageData, 0, 0)

    // add scan lines
    tempCtx.fillStyle = "black"

    for (i = 0; i < h; i += 2) {
      tempCtx.fillRect(0, i, w, 1)
    }

    ctx.drawImage(tempCanvas, 0, 0)
  }
}
