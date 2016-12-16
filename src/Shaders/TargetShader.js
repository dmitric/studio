import Shader from './Shader.js'
import tinycolor from 'tinycolor2'

export default class TargetShader extends Shader {
  
  constructor (name) {
    super(name || "Targets")
  }

  getRandomScalingFactor () {
    return Math.floor((Math.random() * 90) + 1)/100
  }

  renderPixel (ctx, pixel, data, palette) {

    const canFill = true

    var topX = pixel.x * data.blockDimension
    var topY = pixel.y * data.blockDimension

    var centerX = (pixel.x + 0.5) * data.blockDimension
    var centerY = (pixel.y + 0.5) * data.blockDimension

    var radius = (data.blockDimension/2) * 0.9
    var deg = 2 * Math.PI

    let mainFill, secondaryFill, brightColor, darkColor
    const palColor = palette.getColorFromPixel(pixel)

    brightColor = tinycolor.mix(palColor, "#EBF4EF")
    darkColor = tinycolor.mix(palColor, "#111")

    if (pixel.brightness >= 0.5) {
      mainFill = brightColor
      secondaryFill = darkColor
    } else {
      mainFill = darkColor
      secondaryFill = brightColor
    }
    
    ctx.beginPath()
    ctx.rect(topX, topY, data.blockDimension, data.blockDimension)
    ctx.closePath()

    ctx.fillStyle = mainFill
    ctx.strokeStyle = mainFill

    ctx.fill()
    ctx.stroke()

    //if (mainFill === brightColor) {
    //  if (canFill) {
    //    ctx.stroke()
    //  }
    //}

    if (pixel.brightness >= 0.35 && pixel.brightness <= 0.75) {

      radius *= this.getRandomScalingFactor()
      
      ctx.beginPath()

      ctx.arc(centerX, centerY, radius, 0, deg, false)
      
      ctx.closePath()

      ctx.fillStyle = secondaryFill
      ctx.strokeStyle = secondaryFill

      ctx.fill()
      
      if (!canFill) {
        ctx.strokeStyle = brightColor
        ctx.stroke()
      }

      radius *= this.getRandomScalingFactor()

      ctx.beginPath()

      ctx.arc(centerX, centerY, radius, 0, deg, false)
      
      ctx.closePath()

      ctx.fillStyle = mainFill
      ctx.strokeStyle = mainFill

      ctx.fill()

      if (!canFill) {
        ctx.strokeStyle = brightColor
        ctx.stroke()
      }


      if (pixel.brightness >= 0.45 && pixel.brightness <= 0.65) {
        
        radius *= this.getRandomScalingFactor()

        ctx.beginPath()

        ctx.arc(centerX, centerY, radius, 0, deg, false)
        
        ctx.closePath()

        ctx.fillStyle = secondaryFill
        ctx.strokeStyle = secondaryFill

        ctx.fill()

        if (!canFill) {
          ctx.strokeStyle = brightColor
          ctx.stroke()
        }

        radius *= this.getRandomScalingFactor()

        ctx.beginPath()

        ctx.arc(centerX, centerY, radius, 0, deg, false)
        
        ctx.closePath()

        ctx.fillStyle = mainFill
        ctx.strokeStyle = mainFill

        ctx.fill()

        if (!canFill) {
          ctx.strokeStyle = brightColor
          ctx.stroke()
        }

      }
    }
  }
}