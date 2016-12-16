import Shader from './Shader.js'

export default class PixelFireShader extends Shader {
  
  constructor (name) {
    super(name || "Pixel Fire")
  }

  renderPixel (ctx, pixel, data, palette) {
    const canFill = true

    ctx.beginPath()
    
    ctx.rect(
      pixel.x*data.blockDimension,
      pixel.y*data.blockDimension,
      data.blockDimension,
      data.blockDimension
    )
    
    ctx.closePath()

    var color

    if (pixel.brightness < 0.25) {
      color = pixel.inverseBrightnessScale
    } else if (pixel.brightness < 0.3) {
      color = "#f5f5f5"
    } else {
      color = "#111"
    }

    var moreThanHalf = data.columnCount / 2 <= pixel.x
    var atBorder = pixel.x - 1 >= 0 ?
      pixel.brightness > 0.3 && data.pixelGrid[pixel.x-1][pixel.y].brightness < 0.3 : false

    if (pixel.brightness < 0.25 && canFill) {
      ctx.strokeStyle = "white"
    } else if (pixel.brightness < 0.3) {
      ctx.strokeStyle = "#f5f5f5"
    } else {
      ctx.strokeStyle = color
    }

    ctx.fillStyle = color

    if (pixel.brightness < 0.3) {
        ctx.fill()
        //if (!canFill){
          ctx.stroke()
        //}
      }

    if (moreThanHalf && atBorder) {
      pixel.marked = true

      ctx.beginPath()
      ctx.rect(
        pixel.x*data.blockDimension,
        pixel.y*data.blockDimension + data.blockDimension*0.5,
        data.blockDimension,
        data.blockDimension*0.5
      )
      ctx.closePath()

      ctx.fillStyle = "rgba(255, 0,0,0.75)"
      ctx.strokeStyle = "rgba(255, 0,0,0.75)"
      
      ctx.fill()
      
      if (!canFill){
        ctx.stroke()
      }

    } else {
      pixel.marked = false
    }

    if (moreThanHalf && !atBorder) {
      pixel.marked = false
      var iterations = 0
      for (var back = pixel.x-1; back >= pixel.x - data.columnCount/10 ; back--) {
        iterations ++
        if (back > 0) {
          var pix = data.pixelGrid[back][pixel.y]
            
          if (pix.marked) {
            ctx.beginPath()
            ctx.rect(
              pixel.x*data.blockDimension,
              pixel.y*data.blockDimension + data.blockDimension * (1 - 1/(iterations+2)),
              data.blockDimension,
              data.blockDimension/(iterations+2)
            )
            ctx.closePath()

            var c = `rgba(255,0,0, ${(1/(iterations+1))})`

            ctx.fillStyle = c
            ctx.strokeStyle = c
            
            ctx.fill()

            if (!canFill){
              ctx.stroke()
            }
          }
        }
      }
    }
  }
}