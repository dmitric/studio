import Shader from './Shader.js'

import { shuffle, randomIntFromInterval } from '../Utils.js'

export default class RainbowShader extends Shader {
  
  constructor (name) {
    super(name || "Rainbow")
  }

  render (ctx, data, palette) {

    for (let ri=0; ri < data.rowCount; ri ++) {
      let colors = shuffle(["red", "orange", "green", "purple", "blue", "yellow"])
      
      colors.slice(0, 3).some(color => {
        
        ctx.beginPath()

        for (let ci = 0; ci < data.columnCount; ci ++) {
          let multiplierY = this.canFill ? data.blockDimension * Math.random() : 1
          let multiplierX = this.canFill ? Math.random() : 0.5

          // on the edge cases
          if (!this.canFill && (ci === 0 || ci === data.columnCount - 1)) {
            if (ci === 0) {
              multiplierX = 0
            } else {
              multiplierX = 1
            }
          }

          let pixel = data.pixelGrid[ci][ri]

          let pixX = (pixel.x + multiplierX) * data.blockDimension
          let pixY = (pixel.y + 1 - (1 - pixel.brightness) * (ci === 0 ? 1 : (this.canFill ? 4: randomIntFromInterval(4, 5)))) * data.blockDimension + multiplierY
          
          if (ci === 0) {
            ctx.moveTo(pixX, pixY)
          } else {
            ctx.lineTo(pixX, pixY)
          }

        }

        ctx.strokeStyle = color
        ctx.lineWidth = Math.max(Math.floor(data.blockDimension/10), 3)
        
        ctx.stroke()

        return !this.canFill

      })
    }
  }
}
