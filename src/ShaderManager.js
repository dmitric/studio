import ItemManager from './ItemManager.js'

import CircleShader from './Shaders/CircleShader.js'
import GhostSquareShader from './Shaders/GhostSquareShader.js'
import PipeShader from './Shaders/PipeShader.js'
import PixelShader from './Shaders/PixelShader.js'

/**
* ShaderManager
*/
export default class ShaderManager extends ItemManager {
	static defaultItems () {
    return [
      new PixelShader(),
      new CircleShader(),
      new GhostSquareShader(),
      new PipeShader()
    ]
  }
}
