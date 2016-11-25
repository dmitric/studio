import ItemManager from './ItemManager.js'

import PixelShader from './Shaders/PixelShader.js'
import CircleShader from './Shaders/CircleShader.js'
import GhostSquareShader from './Shaders/GhostSquareShader.js'

/**
* ShaderManager
*/
export default class ShaderManager extends ItemManager {
	static defaultItems () {
    return [
      new PixelShader(),
      new CircleShader(),
      new GhostSquareShader(),
    ]
  }
}
