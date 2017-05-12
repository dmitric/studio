import ItemManager from './ItemManager.js'

import ASCIIShader from '../Shaders/ASCIIShader.js'
import CircleShader from '../Shaders/CircleShader.js'
import CloseShader from '../Shaders/CloseShader.js'
import CubeShader from '../Shaders/CubeShader.js'
import DiscShader from '../Shaders/DiscShader.js'
import EquilateralTriangleShader from '../Shaders/EquilateralTriangleShader.js'
import GhostSquareShader from '../Shaders/GhostSquareShader.js'
import GhostTriangleShader from '../Shaders/GhostTriangleShader.js'
import GlitchShader from '../Shaders/GlitchShader.js'
import HollowTriangleShader from '../Shaders/HollowTriangleShader.js'
import PipeShader from '../Shaders/PipeShader.js'
import PixelFireShader from '../Shaders/PixelFireShader.js'
import PixelShader from '../Shaders/PixelShader.js'
import RainbowShader from '../Shaders/RainbowShader.js'
import ScaledCircleShader from '../Shaders/ScaledCircleShader.js'
import ScaledTriangleShader from '../Shaders/ScaledTriangleShader.js'
import SketchingShader from '../Shaders/SketchingShader.js'
import CircleSketchingShader from '../Shaders/CircleSketchingShader.js'
import StarsAndBarsShader from '../Shaders/StarsAndBarsShader.js'
import StretchDiamondShader from '../Shaders/StretchDiamondShader.js'
import StretchShader from '../Shaders/StretchShader.js'
import TargetShader from '../Shaders/TargetShader.js'
import TriangleShader from '../Shaders/TriangleShader.js'
import QuadtreeShader from '../Shaders/QuadtreeShader.js'
import CircleQuadtreeShader from '../Shaders/CircleQuadtreeShader.js'
import ASCIIQuadtreeShader from '../Shaders/ASCIIQuadtreeShader.js'

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
      new ASCIIShader(),
      new ScaledCircleShader(),
      new StretchShader(),
      new GhostSquareShader(),
      new GlitchShader(),
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
      new StretchDiamondShader(),
      new PixelFireShader(),
      new TargetShader(),
      new GhostTriangleShader()
    ]
  }
}
