import React, { Component } from 'react'

import {
  Button, Slider, Popover, PopoverInteractionKind, Position
} from "@blueprintjs/core"

export default class StudioToolbar extends Component {
  constructor (props) {
    super(props)

    this.onToggle = this.onToggle.bind(this)
    this.onPrevious = this.onPrevious.bind(this)
    this.onNext = this.onNext.bind(this)
    this.onFrameChange = this.onFrameChange.bind(this)
    this.onFrameRelease = this.onFrameRelease.bind(this)
    this.onFrameDelete = this.onFrameDelete.bind(this)
    this.onFrameAdd = this.onFrameAdd.bind(this)
    this.onFileSelect = this.onFileSelect.bind(this)
    this.createFrame = this.createFrame.bind(this)

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

  onFrameChange (result) {
    this.props.framePlayer.moveToFrame(result-1)
  }

  onFrameRelease (result) {
    if (this.props.debug) {
      this.props.debugToaster.show({ message: `Skipped to frame ${result}`, iconName: 'arrows-horizontal'})
    }
  }

  onFrameDelete (result) {
    if (this.props.debug) {
      this.props.debugToaster.show({ message: `Removed frame ${result+1}`, iconName: 'delete'})
    }
    this.props.framePlayer.removeFrame(result)
  }

  onFrameAdd (event) {
    this.refs.file.click()
  }

  onFileSelect (e) {
    let files = []
    
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }

    for (var i = 0; i < files.length; i++) {
      this.createFrame(files[i])
    }
  }

  createFrame (file) {
    const reader = new FileReader()

    reader.onloadend = (e) => { 
      this.props.framePlayer.addFrame({url: e.target.result})
      
      if (this.props.debug) {
        this.props.debugToaster.show({ message: `Added frame`, iconName: 'add'})
      }
    }

    reader.readAsDataURL(file)
  }

  render () {

    const popoverContent = (
      <div className='group' style={{ width: '500px'}} >
        <div style={{ float: 'left', width: '429px', overflowX: 'auto', height: '100%' }}>
          <table>
            <tbody>
              <tr>
                {this.props.framePlayer.frames.map((frame, ii) => {
                  let styles = { width: '70px', textAlign: 'center'}
                  let classNames = 'pt-callout'
                  
                  if (this.props.framePlayer.currentFrameIndex === ii) {
                    styles.backgroundColor = 'rgba(195, 228, 22, 0.25)'
                  }

                  return (
                    <td className={classNames} key={ii} style={styles} onClick={() => this.onFrameChange(ii+1) } >
                      <img alt={ii} src={frame.url} />
                      <Button iconName='delete' text='Remove' className='pt-minimal' onClick={() => this.onFrameDelete(ii) } />
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ float: 'left', height: '125px', marginTop: '2px', marginLeft: '5px'}}
              className="pt-callout pt-intent-primary">
          <Button iconName='add' className='pt-large pt-intent-primary fill-height' onClick={this.onFrameAdd} />
          <form>
            <input type="file" ref="file" multiple onChange={this.onFileSelect} style={{display: "none"}} />
          </form>
        </div>
      </div>
    )

    return (
      <div className='StudioToolbar'>
        <div className='pt-card' style={{ marginBottom: '10px'}}>
          <div className='left-button' style={{ position: "absolute", left: 10, top: 25, bottom: 0}}>
            <Popover content={popoverContent}
                     interactionKind={PopoverInteractionKind.CLICK}
                     position={Position.TOP_LEFT}
                     lazy={true}
                     popoverClassName='pt-bound-width'>
              <Button iconName="properties" />
            </Popover>
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
