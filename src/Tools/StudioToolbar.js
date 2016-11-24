import React, { Component } from 'react'

import {
  Button, Slider
} from "@blueprintjs/core";


class StudioToolbar extends Component {
  constructor (props) {
    super(props)

    this.onToggle = this.onToggle.bind(this)
    this.onPrevious = this.onPrevious.bind(this)
    this.onNext = this.onNext.bind(this)
    this.onFrameChange = this.onFrameChange.bind(this)
    this.onFrameRelease = this.onFrameRelease.bind(this)

  }

  onToggle () {
    this.props.framePlayer.toggle()
    if (this.props.framePlayer.isPlaying()) {
      if (this.props.debug) {
        this.props.debugToaster.show({ message: 'Player started', iconName: 'play'})
      }
    } else {
      if (this.props.debug) {
        this.props.debugToaster.show({ message: 'Player paused', iconName: 'pause'})
      }
    }
  }

  onPrevious () {
    this.props.framePlayer.moveToPreviousFrame()
    if (this.props.debug) {
      this.props.debugToaster.show({ message: 'Previous frame', iconName: 'step-backward'})
    }
  }

  onNext () {
    this.props.framePlayer.moveToNextFrame()
    if (this.props.debug) {
      this.props.debugToaster.show({ message: 'Next frame', iconName: 'step-forward'})
    }
  }

  onFrameChange(result) {
    this.props.framePlayer.moveToFrame(result-1)
  }


  onFrameRelease(result) {
    if (this.props.debug) {
      this.props.debugToaster.show({ message: `Skipped to frame ${result}`, iconName: 'arrows-horizontal'})
    }
  }

  render () {
    return (
      <div className='StudioToolbar'>
        <div className='pt-card' style={{ marginBottom: '10px'}}>

          <div className='left-button' style={{ position: "absolute", left: 10, top: 25, bottom: 0}}>
            <Button iconName="properties" onClick={null} />
          </div>

          <div className='buttons' style={{ marginBottom: "10px"}}>
            <Button iconName="step-backward" className="pt-large" onClick={this.onPrevious} />&nbsp;
            <Button iconName={this.props.framePlayer.isPlaying() ? "pause": "play"}
              className="pt-large" onClick={this.onToggle} />&nbsp;
            <Button iconName="step-forward" className="pt-large" onClick={this.onNext} />
          </div>

          <div className="slider">
            <Slider value={this.props.framePlayer.currentFrameIndex+1} min={1} max={this.props.framePlayer.frames.length}
              initialValue={1} renderLabel={false} onChange={this.onFrameChange} onRelease={this.onFrameRelease} />
          </div>

          <div className='right-button' style={{ position: "absolute", right: 10, top: 25, bottom: 0}}>
            <Button iconName={this.props.fullScreen ? 'minimize' : 'fullscreen'} onClick={this.props.toggleFullScreen} />
          </div>
        </div>

        {`${this.props.framePlayer.currentFrameIndex+1} / ${this.props.framePlayer.frames.length}`}
      </div>
    )
  }
}

export default StudioToolbar