export function bound (value, interval) {
	return Math.max(interval[0], Math.min(interval[1], value))
}

export function shuffle (array) {
  var counter = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    var index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    var temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}

export function randomIntFromInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}