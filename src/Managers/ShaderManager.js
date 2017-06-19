import ItemManager from './ItemManager.js'

import ASCIIQuadtreeShader from '../Shaders/ASCIIQuadtreeShader.js'
import ASCIIShader from '../Shaders/ASCIIShader.js'
import CircleQuadtreeShader from '../Shaders/CircleQuadtreeShader.js'
import CircleShader from '../Shaders/CircleShader.js'
import CircleSketchingShader from '../Shaders/CircleSketchingShader.js'
import CloseShader from '../Shaders/CloseShader.js'
import CrossSplitQuadtreeShader from '../Shaders/CrossSplitQuadtreeShader.js'
import CubeShader from '../Shaders/CubeShader.js'
import DiscShader from '../Shaders/DiscShader.js'
import EquilateralTriangleShader from '../Shaders/EquilateralTriangleShader.js'
import GhostSquareShader from '../Shaders/GhostSquareShader.js'
import GhostTriangleShader from '../Shaders/GhostTriangleShader.js'
import GlitchShader from '../Shaders/GlitchShader.js'
import PipeShader from '../Shaders/PipeShader.js'
import PixelFireShader from '../Shaders/PixelFireShader.js'
import PixelShader from '../Shaders/PixelShader.js'
import QuadtreeShader from '../Shaders/QuadtreeShader.js'
import RainbowShader from '../Shaders/RainbowShader.js'
import ScaledCircleShader from '../Shaders/ScaledCircleShader.js'
import ScaledTriangleShader from '../Shaders/ScaledTriangleShader.js'
import SketchingShader from '../Shaders/SketchingShader.js'
import SlantShader from '../Shaders/SlantShader.js'
import StarsAndBarsShader from '../Shaders/StarsAndBarsShader.js'
import TargetShader from '../Shaders/TargetShader.js'
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
      new EquilateralTriangleShader(),
      new CrossSplitQuadtreeShader(),
      new ASCIIShader(),
      new ScaledCircleShader(),
      new GhostSquareShader(),
      new GlitchShader(),
      new SlantShader(),
      new CircleSketchingShader(),
      new CloseShader(),
      new PipeShader(),
      new ScaledTriangleShader(),
      new DiscShader(),
      new SketchingShader(),
      new StarsAndBarsShader(),
      new ASCIIQuadtreeShader(),
      new QuadtreeShader(),
      new CircleQuadtreeShader(),
      new RainbowShader(),
      new PixelFireShader(),
      new TargetShader(),
      new GhostTriangleShader()
    ]
  }
}
