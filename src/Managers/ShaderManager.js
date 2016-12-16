import ItemManager from './ItemManager.js'

import ASCIIShader from '../Shaders/ASCIIShader.js'
import CircleShader from '../Shaders/CircleShader.js'
import CloseShader from '../Shaders/CloseShader.js'
import CubeShader from '../Shaders/CubeShader.js'
import DiscShader from '../Shaders/DiscShader.js'
import EquilateralTriangleShader from '../Shaders/EquilateralTriangleShader.js'
import GhostSquareShader from '../Shaders/GhostSquareShader.js'
import GlitchShader from '../Shaders/GlitchShader.js'
import PipeShader from '../Shaders/PipeShader.js'
import PixelFireShader from '../Shaders/PixelFireShader.js'
import PixelShader from '../Shaders/PixelShader.js'
import RainbowShader from '../Shaders/RainbowShader.js'
import ScaledCircleShader from '../Shaders/ScaledCircleShader.js'
import SketchingShader from '../Shaders/SketchingShader.js'
import StarsAndBarsShader from '../Shaders/StarsAndBarsShader.js'
import TriangleShader from '../Shaders/TriangleShader.js'

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
      new ASCIIShader(),
      new ScaledCircleShader(),
      new GhostSquareShader(),
      new GlitchShader(),
      new CloseShader(),
      new PipeShader(),
      new DiscShader(),
      new SketchingShader(),
      new StarsAndBarsShader(),
      new EquilateralTriangleShader(),
      new RainbowShader(),
      new PixelFireShader()
    ]
  }
}
