
import Canvas from './Canvas.js'
import FramePlayer from './FramePlayer.js'
import ShaderManager from './ShaderManager.js'
import PaletteManager from './PaletteManager.js'

import PixelShader from './Shaders/PixelShader.js'
import CircleShader from './Shaders/CircleShader.js'

import Palette from './Palettes/Palette.js'
import { stepColorPalette } from './Palettes/RulePalette.js'

import React, { Component } from 'react'

import StudioMenu from './Tools/StudioMenu.js'
import StudioToolbar from './Tools/StudioToolbar.js'

import { Position, Toaster, FocusStyleManager } from "@blueprintjs/core";

import '@blueprintjs/core/dist/blueprint.css'

const debugToaster = Toaster.create({
  className: "alert-toaster",
  position: Position.TOP_RIGHT,
});

class Studio extends Component {
  
  constructor (props) {
    super(props)

    this.onUpdate = this.onUpdate.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.toggleDebug = this.toggleDebug.bind(this)
    this.toggleFullScreen = this.toggleFullScreen.bind(this)
    
    this.shaderManager = new ShaderManager([
      new PixelShader(),
      new CircleShader(),
    ], this.onUpdate)

    this.paletteManager = new PaletteManager([
      new Palette('Normal'),
      stepColorPalette("Red Pink",
        ["#111", "red", "#BF384F", "#FF69B4", "white"],
        [0.1, 0.15, 0.25, 0.4, 100])
    ], this.onUpdate)
    
    this.framePlayer = new FramePlayer([
      {url: "/images/1.JPG"},
      {url: "/images/2.JPG"},
      {url: "/images/3.JPG"},
      {url: "/images/4.JPG"},
      {url: "/images/5.JPG"},
      {url: "/images/6.JPG"},
      {url: "/images/7.JPG"},
      {url: "/images/8.JPG"},
      {url: "/images/9.JPG"},
      {url: "/images/10.JPG"}
    ], this.onUpdate)
    
    this.debugToaster = debugToaster

    this.state = {
      debug: true,
      isPlaying: false,
      currentFrameIndex: this.framePlayer.currentFrameIndex,
      frames: this.framePlayer.frames,
      frameCount: this.framePlayer.frames.length,
      currentShaderIndex: this.shaderManager.currentIndex,
      currentPaletteIndex: this.paletteManager.currentIndex,
      fullScreen: false
    }
  }

  componentWillMount () {
    this.updateDimensions(this.state.fullScreen)
    FocusStyleManager.onlyShowFocusOnTabs()
  }

  componentDidMount () {
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.updateDimensions)
  }

  onUpdate () {
    this.setState({
      isPlaying : this.framePlayer.isPlaying(),
      currentFrameIndex: this.framePlayer.currentFrameIndex,
      frameCount: this.framePlayer.frames.length,
      frames: this.framePlayer.frames,
      currentShaderIndex: this.shaderManager.currentIndex,
      currentPaletteIndex: this.paletteManager.currentIndex
    })
  }

  getDimensions (fullScreen) {
    const w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0]
    
    let width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight

    if (!fullScreen) {
      width = Math.min(width, height)
      height = width
    }

    return { width: width, height: height }
  }

  updateDimensions () {
    const dims = this.getDimensions(this.state.fullScreen)

    if (this.state.debug
      && dims.width !== this.state.width
      && dims.height !== this.state.height) {
      //this.debugToaster.show({ message: `Canvas is ${dims.width}px x ${dims.height}px`, iconName: 'move' })
    }

    this.setState(dims)
  }

  toggleDebug () {
    this.setState({debug: !this.state.debug})
  }

  toggleFullScreen () {

    const result = !this.state.fullScreen
    const dims = this.getDimensions(result)
    dims.fullScreen = result

    this.setState(dims)
  
    if (this.state.debug) {
      this.debugToaster.show({
        message: result ? 'Fullscreen On' : 'Fullscreen Off',
        iconName: result ? 'fullscreen' : 'minimize' })

      this.debugToaster.show({ message: `Canvas is ${dims.width}px x ${dims.height}px`, iconName: 'move' })
    }

  }

  render () {
    return (
      <div className='Studio'>
        <Canvas
          width={this.state.width}
          height={this.state.height}
          debug={this.state.debug}
          currentFrame={this.framePlayer.currentFrame()}
          shader={this.shaderManager.current()}
          palette={this.paletteManager.current()}
          debugToaster={this.debugToaster}
          framePlayer={this.framePlayer} />
        
        <StudioTools
          debug={this.state.debug}
          fullScreen={this.state.fullScreen}
          toggleFullScreen={this.toggleFullScreen}
          toggleDebug={this.toggleDebug}
          framePlayer={this.framePlayer}
          paletteManager={this.paletteManager}
          shaderManager={this.shaderManager}
          debugToaster={this.debugToaster} />
      </div>
    )
  }
}

class StudioTools extends Component {
  render () {
    return !this.props.debug ? null : (
      <div>
        <StudioMenu {...this.props} />
        <StudioToolbar {...this.props} />
      </div>
    )
  }
}

export default Studio
