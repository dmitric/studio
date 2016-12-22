import React, { Component } from 'react'

import generateImageDataFromImage from './ImageUtils.js'

export default class Canvas extends Component {
  
  constructor (props) {
    super(props)
    this.drawCanvasFromImage = this.drawCanvasFromImage.bind(this)
    this.clearCanvas = this.clearCanvas.bind(this)
    this.loadFrame = this.loadFrame.bind(this)
    this.defaultColor = props.defaultColor || '#111'
  }

  loadFrame () {
    const img = new Image()
    
    img.onload = () => {
      const timing = this.drawCanvasFromImage(img)
      this.props.onRender(timing)
    }

    if (this.props.currentFrame) {
      img.src = this.props.currentFrame.url
    }
  }

  drawCanvasFromImage (image) {
    
    const ctx = this.refs.canvas.getContext('2d')
    
    this.clearCanvas(ctx)

    if (image) {

      const startProcess = new Date().getTime()
      
      const data = generateImageDataFromImage(image, {
        resolution: this.props.resolution,
        maxWidth: this.props.width,
        maxHeight: this.props.height,
        verticalSkip: this.props.shader.verticalSkip || 1,
        horizontalSkip: this.props.shader.horizontalSkip || 1,
        contrast: this.props.contrast,
        useContrast: true
      })

      const endProcess = new Date().getTime()

      // configure properties of shader
      this.props.shader.configure({
        defaultColor: this.defaultColor,
        fill: this.props.fill,
        stroke: this.props.stroke,
        blockDimension: data.blockDimension,
        framesPlayed: this.props.framePlayer.framesPlayed
      })

      const startRender = new Date().getTime()
      this.props.shader.render(ctx, data, this.props.palette)
      const endRender = new Date().getTime()

      // reset shader properties
      this.props.shader.reset()

      return {
        renderTime: endRender - startRender,
        processTime: endProcess - startProcess
      }
    
    } else {
      ctx.fillStyle = this.defaultColor
      ctx.fillRect(0, 0, this.props.width, this.props.height)

      return { renderTime: 0, processTime: 0}
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
