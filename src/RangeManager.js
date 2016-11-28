import { bound } from './Utils.js'

export default class RangeManager {
  
  constructor (start, min, max, interval, onChange) {
    this.curr = start
    this.min = min
    this.max = max
    this.interval = interval
    this.onChange = onChange
  }

  current () {
    return this.curr
  }

  set (val) {
    const newVal = bound(val, [this.min, this.max])
    if (this.curr !== newVal) {
      this.curr = newVal
      
      if (this.onChange) {
        this.onChange()
      }
    }
  }

  up () {
    const newVal = Math.min(this.curr + this.interval , this.max)
    
    if (this.curr !== newVal) {
      this.curr = newVal
      
      if (this.onChange) {
        this.onChange()
      }
    }
  }

  down () {
    const newVal = Math.max(this.curr - this.interval, this.min)
    
    if (this.curr !== newVal) {
      this.curr = newVal
      
      if (this.onChange) {
        this.onChange()
      }
    }
  }
}