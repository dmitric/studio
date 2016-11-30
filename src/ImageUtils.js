import { bound } from './Utils.js'

function generateImageDataFromImage(image, options) {

  options = {
    minResolution: options.minResolution || 2,
    maxResolution: options.maxResolution || 60,
    resolution: options.resolution || 40,
    maxWidth: options.maxWidth,
    maxHeight: options.maxHeight,
    verticalSkip: options.verticalSkip || 1,
    horizontalSkip: options.horizontalSkip || 1,
    contrast: options.contrast || 50,
    useContrast: options.useContrast || true
  }

  // various thing we'll  need
  const characters = ["@", "#"]

  
  const contrastFactor = calculateContrastFactor(options.contrast)
  
  // how many pixels high or wide can this be.
  const resolution = bound(options.resolution, [options.minResolution, options.maxResolution])
  // how many pixels high or wide will this actually be considering the image dimensions
  const actualResolution = Math.min(image.naturalWidth - 1,
                              image.naturalHeight - 1,
                              resolution)

  // what is the dimension of a pixel given our canvas in px
  const blockDimension = Math.min(options.maxHeight, options.maxWidth) / actualResolution

  // Create a canvas for image perform operations on
  const imageCanvas = document.createElement('canvas')
  imageCanvas.width = image.naturalWidth
  imageCanvas.height = image.naturalHeight

  const imageCtx = imageCanvas.getContext("2d")
  imageCtx.drawImage(image, 0, 0)

  //scale this canvas down, check the two ratios and pick the smaller one
  const horizontalRatio = actualResolution / imageCanvas.width
  const verticalRatio =  actualResolution / imageCanvas.height

  const actualRatio = Math.min(horizontalRatio, verticalRatio)

  const scaledCanvas = downScaleCanvas(imageCanvas, actualRatio)
  const scaledCanvasCtx = scaledCanvas.getContext('2d')


  const canvasWidth = Math.floor(imageCanvas.width * actualRatio);
  const canvasHeight = Math.floor(imageCanvas.height * actualRatio);

  
  // get image data
  const imageData = scaledCanvasCtx.getImageData(0, 0, canvasWidth, canvasHeight);

  const results = {
    rowCount: canvasHeight/options.verticalSkip,
    columnCount: canvasWidth/options.horizontalSkip,
    blockDimension: blockDimension,
    pixelGrid: create2DArray(canvasWidth/options.horizontalSkip)
  }

  let actualX = 0, actualY = 0

  for (var y = 0; y < canvasHeight; y += options.verticalSkip) { // every other row because letters are not square
    
    actualX = 0

    for (let x = 0; x < canvasWidth; x += options.horizontalSkip) {
      // get each pixel's brightness and output corresponding character

      let offset = (y * canvasWidth + x) * 4

      let color = getColorAtOffset(imageData.data, offset)

      // increase the contrast of the image so that the ASCII representation looks better
      // http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
      let contrastedColor = calculateContrastColor(color, contrastFactor)

      // calculate pixel brightness
      // http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
      let brightness = calculatePixelBrightness(contrastedColor)

      let character = characters[(characters.length - 1) - Math.round(brightness * (characters.length - 1))]

      let useColor = options.useContrast ? contrastedColor : color

      let greyscale = (useColor.red + useColor.green + useColor.blue)/3

      let pixel = {
        character: character,
        color: `rgb(${useColor.red}, ${useColor.green}, ${useColor.blue})`,
        brightness: brightness,
        greyscale: `rgb(${greyscale},${greyscale}, ${greyscale})`,
        inverseBrightnessScale: `rgb(${Math.floor((1-brightness) * 255)}, ${Math.floor((1-brightness) * 255)}, ${Math.floor((1-brightness) * 255)})`,
        brightnessScale: `rgb(${Math.floor((brightness) * 255)}, ${Math.floor((brightness) * 255)}, ${Math.floor((brightness) * 255)})`,
        x: actualX,
        y: actualY,
        r: useColor.red,
        g: useColor.green,
        b: useColor.blue
      }

      results.pixelGrid[pixel.x][pixel.y] = pixel

      actualX ++

    }

    actualY ++
  }

  return results
}

function calculateContrastColor(color, contrastFactor) {
  return {
    red: bound(Math.floor((color.red - 128) * contrastFactor) + 128, [0, 255]),
    green: bound(Math.floor((color.green - 128) * contrastFactor) + 128, [0, 255]),
    blue: bound(Math.floor((color.blue - 128) * contrastFactor) + 128, [0, 255]),
    alpha: color.alpha
  }
}

function calculateContrastFactor(contrast) {
  // calculate contrast factor
  // http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
  return (259 * (contrast + 255)) / (255 * (259 - contrast))
}


function calculatePixelBrightness (color) {
  // calculate pixel brightness
  // http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
  return (0.299 * color.red + 0.587 * color.green + 0.114 * color.blue) / 255;
}

function getColorAtOffset(data, offset) {
  return {
    red: data[offset],
    green: data[offset + 1],
    blue: data[offset + 2],
    alpha: data[offset + 3]
  }
}

function create2DArray(rows) {
  const arr = []

  for (let i = 0; i < rows; i++) {
    arr[i] = []
  }

  return arr
}

function downScaleCanvas(cv, scale) {

  if (!(scale < 1) || !(scale > 0)) {
  	throw new Error('scale must be a positive number <1')
  }

  var sqScale = scale * scale; // square scale = area of source pixel within target
  var sw = cv.width; // source image width
  var sh = cv.height; // source image height
  var tw = Math.floor(sw * scale); // target image width
  var th = Math.floor(sh * scale); // target image height
  var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
  var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
  var tX = 0, tY = 0; // rounded tx, ty
  var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
  // weight is weight of current source point within target.
  // next weight is weight of current source point within next target's point.
  var crossX = false; // does scaled px cross its current px right border ?
  var crossY = false; // does scaled px cross its current px bottom border ?
  var sBuffer = cv.getContext('2d').getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
  var tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
  var sR = 0, sG = 0,  sB = 0; // source's current point r,g,b
  /* untested !
  var sA = 0;  //source alpha  */

  for (sy = 0; sy < sh; sy++) {
      ty = sy * scale; // y src position within target
      tY = 0 | ty;     // rounded : target pixel's y
      yIndex = 3 * tY * tw;  // line index within target array
      crossY = (tY !== (0 | ty + scale));
      if (crossY) { // if pixel is crossing botton target pixel
          wy = (tY + 1 - ty); // weight of point within target pixel
          nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
      }
      for (sx = 0; sx < sw; sx++, sIndex += 4) {
          tx = sx * scale; // x src position within target
          tX = 0 |  tx;    // rounded : target pixel's x
          tIndex = yIndex + tX * 3; // target pixel index within target array
          crossX = (tX !== (0 | tx + scale));
          if (crossX) { // if pixel is crossing target pixel's right
              wx = (tX + 1 - tx); // weight of point within target pixel
              nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
          }
          sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
          sG = sBuffer[sIndex + 1];
          sB = sBuffer[sIndex + 2];

          /* !! untested : handling alpha !!
             sA = sBuffer[sIndex + 3];
             if (!sA) continue;
             if (sA != 0xFF) {
                 sR = (sR * sA) >> 8;  // or use /256 instead ??
                 sG = (sG * sA) >> 8;
                 sB = (sB * sA) >> 8;
             }
          */
          if (!crossX && !crossY) { // pixel does not cross
              // just add components weighted by squared scale.
              tBuffer[tIndex    ] += sR * sqScale;
              tBuffer[tIndex + 1] += sG * sqScale;
              tBuffer[tIndex + 2] += sB * sqScale;
          } else if (crossX && !crossY) { // cross on X only
              w = wx * scale;
              // add weighted component for current px
              tBuffer[tIndex    ] += sR * w;
              tBuffer[tIndex + 1] += sG * w;
              tBuffer[tIndex + 2] += sB * w;
              // add weighted component for next (tX+1) px
              nw = nwx * scale
              tBuffer[tIndex + 3] += sR * nw;
              tBuffer[tIndex + 4] += sG * nw;
              tBuffer[tIndex + 5] += sB * nw;
          } else if (crossY && !crossX) { // cross on Y only
              w = wy * scale;
              // add weighted component for current px
              tBuffer[tIndex    ] += sR * w;
              tBuffer[tIndex + 1] += sG * w;
              tBuffer[tIndex + 2] += sB * w;
              // add weighted component for next (tY+1) px
              nw = nwy * scale
              tBuffer[tIndex + 3 * tw    ] += sR * nw;
              tBuffer[tIndex + 3 * tw + 1] += sG * nw;
              tBuffer[tIndex + 3 * tw + 2] += sB * nw;
          } else { // crosses both x and y : four target points involved
              // add weighted component for current px
              w = wx * wy;
              tBuffer[tIndex    ] += sR * w;
              tBuffer[tIndex + 1] += sG * w;
              tBuffer[tIndex + 2] += sB * w;
              // for tX + 1; tY px
              nw = nwx * wy;
              tBuffer[tIndex + 3] += sR * nw;
              tBuffer[tIndex + 4] += sG * nw;
              tBuffer[tIndex + 5] += sB * nw;
              // for tX ; tY + 1 px
              nw = wx * nwy;
              tBuffer[tIndex + 3 * tw    ] += sR * nw;
              tBuffer[tIndex + 3 * tw + 1] += sG * nw;
              tBuffer[tIndex + 3 * tw + 2] += sB * nw;
              // for tX + 1 ; tY +1 px
              nw = nwx * nwy;
              tBuffer[tIndex + 3 * tw + 3] += sR * nw;
              tBuffer[tIndex + 3 * tw + 4] += sG * nw;
              tBuffer[tIndex + 3 * tw + 5] += sB * nw;
          }
      } // end for sx
  } // end for sy

  // create result canvas
  var resCV = document.createElement('canvas');
  resCV.width = tw;
  resCV.height = th;
  var resCtx = resCV.getContext('2d');
  var imgRes = resCtx.getImageData(0, 0, tw, th);
  var tByteBuffer = imgRes.data;
  // convert float32 array into a UInt8Clamped Array
  var pxIndex = 0; //
  for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
      tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
      tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
      tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
      tByteBuffer[tIndex + 3] = 255;
  }
  // writing result to canvas.
  resCtx.putImageData(imgRes, 0, 0);
  return resCV;
}

export default generateImageDataFromImage