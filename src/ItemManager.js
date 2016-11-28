/**
* Base class for managing a list of items with names
*/

export default class ItemManager {
  constructor (items, onChange) {
    this.items = items || []
      this.currentIndex = 0
      this.nameMapping = {}
      this.onChange = onChange

      items.forEach((ii, index) => {
        this.nameMapping[ii.name] = {item: ii, index: index }
      })
  }

  current () {
    return this.items[this.currentIndex]
  }

  add (item) {
    this.items.push(item)

    this.nameMapping[item.name] = {item: item, index: this.items.length-1}
    
    if (this.onChange) {
      this.onChange()
    }
  }

  nextIndex () {
    if (this.items.length) {
      return (this.currentIndex + 1 > this.items.length - 1 ) ? 0 : this.currentIndex + 1
    } else {
      return null
    }
  }

  moveToNextIndex () {
    const nextInd = this.nextIndex()
    
    if (nextInd !== null) {
      this.currentIndex = nextInd
      if (this.onChange){
        this.onChange()
      }
    }
  }

  moveToPreviousIndex () {
    const previousInd = this.previousIndex()
    
    if (previousInd !== null) {
      this.currentIndex = previousInd
      if (this.onChange){
        this.onChange()
      }
    }
  }

  previousIndex () {
    if (this.items.length) {
      return (this.currentIndex - 1 < 0) ? this.items.length - 1 : this.currentIndex - 1
    } else {
      return null
    }
  }

  getByName(name) {
    return this.nameMapping[name]
  }

  getItems () {
    return this.items
  }

  selectByName (name) {
    const result = this.getByName(name)
    
    if (result) {
      this.selectIndex(result.index)
      
      if (this.onChange) {
        this.onChange()
      }
    }
  }

  selectIndex (index) {
    this.currentIndex = index
    if (this.onChange) {
      this.onChange()
    }
  }

}
