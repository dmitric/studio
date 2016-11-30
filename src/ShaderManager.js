import ItemManager from './ItemManager.js'

import CircleShader from './Shaders/CircleShader.js'
import GhostSquareShader from './Shaders/GhostSquareShader.js'
import PipeShader from './Shaders/PipeShader.js'
import PixelShader from './Shaders/PixelShader.js'
import DiscShader from './Shaders/DiscShader.js'
import SketchingShader from './Shaders/SketchingShader.js'
import StarsAndBarsShader from './Shaders/StarsAndBarsShader.js'
import TriangleShader from './Shaders/TriangleShader.js'
import CubeShader from './Shaders/CubeShader.js'
import EquilateralTriangleShader from './Shaders/EquilateralTriangleShader.js'
import CloseShader from './Shaders/CloseShader.js'

/**
* ShaderManager
*/
export default class ShaderManager extends ItemManager {
	static defaultItems () {
    return [
      new PixelShader(),
      new CircleShader(),
      new TriangleShader(),
      new CubeShader(),
      new GhostSquareShader(),
      new CloseShader(),
      new PipeShader(),
      new DiscShader(),
      new SketchingShader(),
      new StarsAndBarsShader(),
      new EquilateralTriangleShader()
    ]
  }
}
