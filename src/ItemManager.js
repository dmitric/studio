class ItemManager {
	
	constructor (items, onChange) {
		this.items = items || []
  	this.currentIndex = 0
  	this.nameMapping = {}
  	this.onChange = onChange

  	items.forEach(function(ii, index) {
  		this.nameMapping[ii.name] = {item: ii, index: index }
  	}.bind(this))

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

export default ItemManager