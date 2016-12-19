import ItemManager from './ItemManager.js'

export default class FrameSetManager extends ItemManager {
  static defaultItems () {
    return [
      FrameSetManager.generateURLs('run', 6),
      FrameSetManager.generateURLs('face', 10),
      FrameSetManager.generateURLs('jump', 11)
    ]
  }

  static generateURLs (name, frameCount, fileType) {
    fileType = fileType || 'jpg'
    
    const urls = Array.from(Array(frameCount), (_, i) => {
      return { url : `${process.env.PUBLIC_URL}/images/${name}/${name}_${ i + 1 < 10 ? `0${i+1}`: i+1 }.${fileType}` }
    })

    return {'name': name, urls: urls}
  }
}