import Canvas from './Canvas.js'

import FramePlayer from './FramePlayer.js'

import ContrastManager from './Managers/ContrastManager.js'
import PaletteManager from './Managers/PaletteManager.js'
import ResolutionManager from './Managers/ResolutionManager.js'
import ShaderManager from './Managers/ShaderManager.js'
import FrameSetManager from './Managers/FrameSetManager.js'

import React, { Component } from 'react'

import StudioMenu from './Tools/StudioMenu.js'
import StudioToolbar from './Tools/StudioToolbar.js'

import { Position, Toaster, FocusStyleManager } from "@blueprintjs/core";

import '@blueprintjs/core/dist/blueprint.css'

const debugToaster = Toaster.create({
  className: "alert-toaster",
  position: Position.TOP_RIGHT,
});

/**
* Welcome to the Studio
*/
export default class Studio extends Component {
  
  constructor (props) {
    super(props)

    this.onUpdate = this.onUpdate.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.toggleDebug = this.toggleDebug.bind(this)
    this.toggleFullScreen = this.toggleFullScreen.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.toggleFill = this.toggleFill.bind(this)
    this.toggleStroke = this.toggleStroke.bind(this)

    this.onRender = this.onRender.bind(this)
    
    this.shaderManager = new ShaderManager(
                                ShaderManager.defaultItems(),
                                this.onUpdate)

    this.paletteManager = new PaletteManager(
                                PaletteManager.defaultItems(),
                                this.onUpdate)

    this.resolutionManager = new ResolutionManager(
                                    4*9, 4, 4*13, 2,
                                    this.onUpdate)

    this.contrastManager = new ContrastManager(
                                    70, 2, 100, 2,
                                    this.onUpdate)

    this.frameSetManager = new FrameSetManager(FrameSetManager.defaultItems())
    
    this.framePlayer = new FramePlayer(
                              this.frameSetManager.getByName("face").item.urls,
                              this.onUpdate)
    
    this.debugToaster = debugToaster

    this.saver = {}

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
      contrast: this.contrastManager.current(),
      fill: true,
      stroke: true
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

  toggleFill () {
    const result = !this.state.fill

    if (this.state.debug) {
      this.debugToaster.show({
        message: !result ? 'Fill off' : 'Fill on',
        iconName: !result ? 'circle' : 'full-circle'
      })
    }

    this.setState({fill: result})
  }

  toggleStroke () {
    const result = !this.state.stroke

    if (this.state.debug) {
      this.debugToaster.show({
        message: !result ? 'Stroke off' : 'Stroke on',
        iconName: !result ? 'circle' : 'full-circle'
      })
    }

    this.setState({stroke: result})
  }

  toggleDebug () {
    if (this.state.debug) {
      this.debugToaster.show({ message: "Press ⌘H to toggle menus on", iconName: 'help'})
    }

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

  onRender (timing) {
    if (this.state.debug) {
      console.log(`Time to process: ${timing.processTime}ms`)
      console.log(`Time to render: ${timing.renderTime}ms`)
    }
  }

  saveImage () {
    const canvas = document.getElementsByTagName('canvas')[0]
    
    const downloadLink = canvas.toDataURL('image/png')
    
    const link = document.createElement('a')
    
    link.href = downloadLink
    link.setAttribute('download', `studio-${this.shaderManager.current().name}-${this.paletteManager.current().name}-${this.framePlayer.currentFrameIndex+1}.png`)
    link.click()

    if (this.state.debug) {
      this.debugToaster.show({
        message: `Image saved`, iconName: 'download'
      })
    }
  }

  handleKeydown (ev) {
    if ((ev.metaKey || ev.ctrlKey) && ev.which === 72) {
      ev.preventDefault()
      this.toggleDebug()
    } else if ((ev.metaKey || ev.ctrlKey) && ev.which === 83) {
      ev.preventDefault()
      this.saveImage()
    } else if ((ev.metaKey || ev.ctrlKey) && ev.which === 70) {
      ev.preventDefault()
      this.toggleFullScreen()
    } else if ((ev.metaKey || ev.ctrlKey) && ev.which === 68) {
      ev.preventDefault()
      this.toggleFill()
    } else if ((ev.metaKey || ev.ctrlKey) && ev.which === 71) {
      ev.preventDefault()
      this.toggleStroke()
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
          onRender={this.onRender}
          resolution={this.resolutionManager.current()}
          contrast={this.contrastManager.current()}
          fill={this.state.fill}
          stroke={this.state.stroke} />
        
        <StudioTools
          debug={this.state.debug}
          fullScreen={this.state.fullScreen}
          toggleFullScreen={this.toggleFullScreen}
          toggleDebug={this.toggleDebug}
          toggleFill={this.toggleFill}
          toggleStroke={this.toggleStroke}
          saveImage={this.saveImage}
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
