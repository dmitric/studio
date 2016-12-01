/**
* Manages playback
*/

export default class FramePlayer {
  constructor (frames, onChange) {
    this.frames = frames || []
    this.currentFrameIndex = 0
    this.period = 100
    this.playing = false
    this.onChange = onChange
    this.timeoutId = null
    this.framesPlayed = 0
  }

  addFrame (frame) {
    this.frames.push(frame)
    if (this.onChange){
      this.onChange()
    }
  }

  nextFrameIndex () {
    if (this.canPlay()) {
      return (this.currentFrameIndex + 1 > this.frames.length - 1 ) ? 0 : this.currentFrameIndex + 1
    } else {
      return null
    }
  }

  setPeriod (period) {
    this.period = period
    if (this.onChange){
      this.onChange()
    }
  }

  getPeriod () {
    return this.period
  }

  currentFrame () {
    if (this.canPlay()) {
      return this.frames[this.currentFrameIndex]
    } else {
      return null
    }
  }

  moveToFrame (index) {
    if (index >= 0 && index < this.frames.length) {
      this.currentFrameIndex = index
      
      if (this.onChange) {
        this.onChange()
      }
    }
  }

  moveToLastFrame() {
    const lastFrameId = this.frames.length - 1
    if (lastFrameId >= 0) {
      this.currentFrameIndex = lastFrameId
      if (this.onChange) {
        this.onChange()
      }
    }
  }

  moveToNextFrame () {
    const nextFrameInd = this.nextFrameIndex()
    
    if (nextFrameInd !== null) {
      this.currentFrameIndex = nextFrameInd
      if (this.onChange) {
        this.onChange()
      }
    }
  }

  moveToPreviousFrame () {
    const previousFrameInd = this.previousFrameIndex()
    
    if (previousFrameInd !== null) {
      this.currentFrameIndex = previousFrameInd
      if (this.onChange){
        this.onChange()
      }
    }
  }

  previousFrameIndex () {
    if (this.canPlay()) {
      return (this.currentFrameIndex - 1 < 0) ? this.frames.length - 1 : this.currentFrameIndex - 1
    } else {
      return null
    }
  }

  removeFrame (ii) {
    this.frames.splice(ii, 1)
    
    this.currentFrameIndex = Math.max(0, Math.min(this.frames.length-1, this.currentFrameIndex))

    if (this.onChange){
      this.onChange()
    }
  }

  start () {
    if (this.canPlay()) {
      this.playing = true
      
      if (this.onChange){
        this.onChange()
      }

      this.timeoutId = window.setTimeout(function() { 
        this.moveToNextFrame()
        this.start()
        this.framesPlayed++
      }.bind(this) , this.period)
    }
  }

  stop () {
    this.playing = false
    this.framesPlayed = 0
    window.clearTimeout(this.timeoutId)
    if (this.onChange){
      this.onChange()
    }
  }

  toggle () {
    if (this.canPlay()){
      if (this.isPlaying()) {
        this.stop()
      } else {
        this.start()
      }
    }
  }

  canPlay () {
    return this.frames && this.frames.length > 0
  }

  isPlaying () {
    return this.playing
  }
}
