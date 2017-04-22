import StretchShader from './StretchShader.js'

export default class StretchDiamondShader extends StretchShader {
  
  constructor (name) {
    super(name || "Stretch Diamonds")
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