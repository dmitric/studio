import React, { Component } from 'react'

import generateImageDataFromImage from './ImageUtils.js'

export default class Canvas extends Component {
  
  constructor (props) {
    super(props);
    this.drawCanvasFromImage = this.drawCanvasFromImage.bind(this)
    this.clearCanvas = this.clearCanvas.bind(this)
    this.loadFrame = this.loadFrame.bind(this)
    this.defaultColor = props.defaultColor || 'black'
  }

  loadFrame () {
    const img = new Image()
    
    img.onload = () => {
      this.drawCanvasFromImage(img)
    }

    img.src = this.props.currentFrame.url
  }

  drawCanvasFromImage (image) {
    
    const ctx = this.refs.canvas.getContext('2d')
    
    this.clearCanvas(ctx)

    if (image) {

      const data = generateImageDataFromImage(image, {
        resolution: 20,
        maxWidth: this.props.width,
        maxHeight: this.props.height,
        verticalSkip: this.props.shader.verticalSkip || 1,
        horizontalSkip: this.props.shader.horizontalSkip || 1,
        contrast: 70,
        useContrast: true
      })

      this.props.shader.render(ctx, data, this.props.palette)
    
    } else {
      ctx.fillStyle = this.defaultColor
      ctx.fillRect(0, 0, this.props.width, this.props.height)
    }
  }

  clearCanvas (ctxIn) {
    const ctx = ctxIn || this.refs.canvas.getContext('2d')
    
    ctx.clearRect(0, 0, this.props.width, this.props.height)

    ctx.fillStyle = this.defaultColor
    
    ctx.fillRect(0, 0, this.props.width, this.props.height)
  }

  componentDidMount () {
    this.loadFrame()
  }

  componentDidUpdate () {
    this.loadFrame()
  }

  render () {
    return (
      <canvas ref="canvas" width={this.props.width} height={this.props.height} />
    )
  }
}
