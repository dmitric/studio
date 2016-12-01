import ItemManager from './ItemManager.js'

import CircleShader from '../Shaders/CircleShader.js'
import CloseShader from '../Shaders/CloseShader.js'
import CubeShader from '../Shaders/CubeShader.js'
import DiscShader from '../Shaders/DiscShader.js'
import EquilateralTriangleShader from '../Shaders/EquilateralTriangleShader.js'
import GhostSquareShader from '../Shaders/GhostSquareShader.js'
import PipeShader from '../Shaders/PipeShader.js'
import PixelShader from '../Shaders/PixelShader.js'
import ScaledCircleShader from '../Shaders/ScaledCircleShader.js'
import SketchingShader from '../Shaders/SketchingShader.js'
import StarsAndBarsShader from '../Shaders/StarsAndBarsShader.js'
import TriangleShader from '../Shaders/TriangleShader.js'
import RainbowShader from '../Shaders/RainbowShader.js'

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
      new ScaledCircleShader(),
      new GhostSquareShader(),
      new CloseShader(),
      new PipeShader(),
      new DiscShader(),
      new SketchingShader(),
      new StarsAndBarsShader(),
      new EquilateralTriangleShader(),
      new RainbowShader()
    ]
  }
}
