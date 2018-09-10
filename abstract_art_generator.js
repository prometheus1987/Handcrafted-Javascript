// globals
var minWidth, minHeight;

var render = function(canvasId) {

  var canvas = document.getElementById(canvasId);
  var cWidth = canvas.width;
  var cHeight = canvas.height;
  var depth = 4;

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, cWidth, cHeight);

    try {
      splitGrid(ctx, depth, 0, 0, cWidth, cHeight);
    } catch (err) {
      console.error(err);
    }
  }
}


/**
 * Split a given bounding box width-wise randomly and
 * for each width split, create 2 vertical bounding boxes.
 *
 * Depending on the depth, recursively call to split the grid further
 * or simply fill the bounding box using a similar algorithm
 */
var splitGrid = function(ctx, depth, gx, gy, cWidth, cHeight) {

  if (depth % 2 !== 0 || depth < 2) {
    throw new Error('depth needs to be a multiple of 2 (min 2)');
  }

  var x = 0,
    y = 0,
    width = 0,
    height = 0;

  //
  // start at 0 and then loop until the width has been reached, splitting on each loop
  //
  // note that while the algorithm works on x, y, width and height as a bounding box
  // the actual values that need to be passed along need to be corrected via gx and gy
  // so that the final drawing on the context knows where to go.
  //
  while (x < cWidth) {

    // reset y to 0, we split our box vertically only once
    y = 0;

    // get the minimum width (relative to the depth)
    // then correct for overflow to keep it smooth
    // also need to check for shady widths

    if (cWidth <= self.minWidth * depth) {
      width = cWidth;
    } else {
      width = chance.integer({ min: self.minWidth * depth, max: cWidth });
      width = width - (width % (self.minWidth * depth));
    }

    // correct for the last box in the series
    if (x + width > cWidth) {
      width = cWidth - x;
    }

    // similar concept with height except no last box correction required as we only split it once
    if (cHeight <= self.minHeight * depth) {
      height = cHeight;
    } else {
      height = chance.integer({ min: self.minHeight * depth, max: cHeight });
      height = height - (height % (self.minHeight * depth));
    }

    if (depth <= 2) {
      fillGrid(ctx, x + gx, y + gy, width, height);
    } else {
      splitGrid(ctx, depth - 2, x + gx, y + gy, width, height);
    }

    // simple split twice
    y = height;
    height = cHeight - height;

    if (height != 0) {
      if (depth <= 2) {
        fillGrid(ctx, x + gx, y + gy, width, height);
      } else {
        splitGrid(ctx, depth - 2, x + gx, y + gy, width, height);
      }
    }

    x += width;
  }

}


/**
 * Use a similar algorithm as fill grid to randomly split the bounding box width-wise
 * and draw rectangles (2 per width split again)
 */
var fillGrid = function(ctx, gx, gy, cWidth, cHeight) {

  if (cWidth <= 0 || cHeight <= 0) {
    return;
  }

  var x = 0,
    y = 0,
    width = 0,
    height = 0;

  while (x < cWidth) {

    y = 0;

    // because we have a dynamically sized canvas, it is possible to end up with shady widths and heights
    if (cWidth <= minWidth) {
      width = cWidth;
    } else {
      width = chance.integer({ min: minWidth, max: cWidth });
      width = width - (width % minWidth);
    }

    if (x + width > cWidth) {
      width = cWidth - x;
    }

    if (cHeight <= minHeight) {
      height = cHeight;
    } else {
      height = chance.integer({ min: minHeight, max: cHeight });
      height = height - (height % minHeight);
    }

    ctx.fillStyle = getColor();
    ctx.fillRect(x + gx, y + gy, width, height);

    y = height;
    height = cHeight - height;

    ctx.fillStyle = getColor();
    ctx.fillRect(x + gx, y + gy, width, height);

    x += width;
  }

}

var getColor = function() {

  var r = chance.integer({ min: 1, max: 255 }),
    g = chance.integer({ min: 1, max: 255 }),
    b = chance.integer({ min: 1, max: 255 });

  var color = 'rgb(' + r + ',' + g + ',' + b + ')';

  return color;
}