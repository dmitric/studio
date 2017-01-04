import Shader from './Shader.js'

export default class StretchDiamondShader extends Shader {
  
  constructor (name) {
    super(name || "Stretch Diamonds")
  }

  generateRandomNumbers (n, m) {
    let i = 0
    let randNums = []
    let sum = 0
    
    for (i = 0; i < n; i++) {
      randNums[i] = Math.random()
      sum += randNums[i]
    }

    for (i = 0; i < n; i++) {
      randNums[i] /= sum
      randNums[i] *= m
    }

    return randNums
  }

  renderPixels (ctx, data, palette) {
    
    data.pixelGrid.forEach(pixelRow => {

      const sizes = this.generateRandomNumbers(pixelRow.length, data.blockDimension * data.rowCount)
      let startingY = 0

      pixelRow.forEach((pixel, i) => {

        ctx.beginPath()

        ctx.moveTo((pixel.x + 0.5) * data.blockDimension, startingY)
        
        ctx.lineTo((pixel.x + 1) * data.blockDimension, startingY + sizes[i]/2)
        
        ctx.lineTo((pixel.x + 0.5) * data.blockDimension, startingY + sizes[i])

        ctx.lineTo(pixel.x * data.blockDimension, startingY + sizes[i]/2)

        ctx.lineTo((pixel.x + 0.5) * data.blockDimension, startingY)

        startingY += sizes[i]
    
        ctx.closePath()

        this.fillPixelWithPalette(ctx, pixel, palette)

      })

    })
  }
}