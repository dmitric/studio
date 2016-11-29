
import Canvas from './Canvas.js'
import FramePlayer from './FramePlayer.js'
import ShaderManager from './ShaderManager.js'
import PaletteManager from './PaletteManager.js'
import ResolutionManager from './ResolutionManager.js'
import ContrastManager from './ContrastManager.js'

import React, { Component } from 'react'

import StudioMenu from './Tools/StudioMenu.js'
import StudioToolbar from './Tools/StudioToolbar.js'

import { Position, Toaster, FocusStyleManager } from "@blueprintjs/core";

import '@blueprintjs/core/dist/blueprint.css'

const debugToaster = Toaster.create({
  className: "alert-toaster",
  position: Position.TOP_RIGHT,
});

export default class Studio extends Component {
  
  constructor (props) {
    super(props)

    this.onUpdate = this.onUpdate.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.toggleDebug = this.toggleDebug.bind(this)
    this.toggleFullScreen = this.toggleFullScreen.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    
    this.shaderManager = new ShaderManager(
                                ShaderManager.defaultItems(),
                                this.onUpdate)

    this.paletteManager = new PaletteManager(
                                PaletteManager.defaultItems(),
                                this.onUpdate)

    this.resolutionManager = new ResolutionManager(
                                    28, 4, 44, 2,
                                    this.onUpdate)

    this.contrastManager = new ContrastManager(
                                    70, 2, 100, 2,
                                    this.onUpdate)
    
    this.framePlayer = new FramePlayer([
      {url: `${process.env.PUBLIC_URL}/images/1.JPG`},
      {url: `${process.env.PUBLIC_URL}/images/2.JPG`},
      {url: `${process.env.PUBLIC_URL}/images/3.JPG`},
      {url: `${process.env.PUBLIC_URL}/images/4.JPG`},
      {url: `${process.env.PUBLIC_URL}/images/5.JPG`},
      {url: `${process.env.PUBLIC_URL}/images/6.JPG`},
      {url: `${process.env.PUBLIC_URL}/images/7.JPG`},
      {url: `${process.env.PUBLIC_URL}/images/8.JPG`},
      {url: `${process.env.PUBLIC_URL}/images/9.JPG`},
      {url: `${process.env.PUBLIC_URL}/images/10.JPG`}
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
      fullScreen: false,
      resolution: this.resolutionManager.current(),
      contrast: this.contrastManager.current()
    }
  }

  handleKeydown (ev) {
    if ((ev.metaKey || ev.ctrlKey) && ev.which === 72) {
      ev.preventDefault()
      this.setState({debug: !this.state.debug})
    } else if ((ev.metaKey || ev.ctrlKey) && ev.which === 70) {
      ev.preventDefault()
      this.toggleFullScreen()
    } else if (ev.which === 32) {
      ev.preventDefault()
      this.framePlayer.toggle()
    } else if (ev.which === 39) {
      ev.preventDefault()
      if (ev.metaKey || ev.ctrlKey) {
        this.paletteManager.moveToNextIndex()
      } else {
        this.shaderManager.moveToNextIndex()
      }
    } else if (ev.which === 37) {
      ev.preventDefault()
      if (ev.metaKey || ev.ctrlKey) {
        this.paletteManager.moveToPreviousIndex()
      } else {
        this.shaderManager.moveToPreviousIndex()
      }
    } else if (ev.which === 38) {
      ev.preventDefault()
      if (ev.metaKey || ev.ctrlKey) {
        this.contrastManager.up()
      } else {
        this.resolutionManager.up()
      }
    } else if (ev.which === 40) {
      ev.preventDefault()
      if (ev.metaKey || ev.ctrlKey) {
        this.contrastManager.down()
      } else {
        this.resolutionManager.down()
      }
    }
  }

  componentWillMount () {
    this.updateDimensions(this.state.fullScreen)
    FocusStyleManager.onlyShowFocusOnTabs()
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeydown, true)
    window.addEventListener("resize", this.updateDimensions, true)
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.updateDimensions, true)
    window.removeEventListener('keydown', this.handleKeydown, true)
  }

  onUpdate () {
    this.setState({
      isPlaying : this.framePlayer.isPlaying(),
      currentFrameIndex: this.framePlayer.currentFrameIndex,
      frameCount: this.framePlayer.frames.length,
      frames: this.framePlayer.frames,
      currentShaderIndex: this.shaderManager.currentIndex,
      currentPaletteIndex: this.paletteManager.currentIndex,
      resolution: this.resolutionManager.current(),
      contrast: this.contrastManager.current()
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
        iconName: result ? 'fullscreen' : 'minimize'
      })

      this.debugToaster.show({
        message: `Canvas is ${dims.width}px x ${dims.height}px`,
        iconName: 'move'
      })
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
          framePlayer={this.framePlayer}
          resolution={this.resolutionManager.current()}
          contrast={this.contrastManager.current()} />
        
        <StudioTools
          debug={this.state.debug}
          fullScreen={this.state.fullScreen}
          toggleFullScreen={this.toggleFullScreen}
          toggleDebug={this.toggleDebug}
          framePlayer={this.framePlayer}
          paletteManager={this.paletteManager}
          shaderManager={this.shaderManager}
          debugToaster={this.debugToaster}
          resolutionManager={this.resolutionManager}
          contrastManager={this.contrastManager} />
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