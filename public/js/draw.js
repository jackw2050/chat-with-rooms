


var $ = function(id){return document.getElementById(id)};

  var canvas = this.__canvas = new fabric.Canvas('c', {
    isDrawingMode: false

  });
console.log(canvas.isDrawingMode);
  fabric.Object.prototype.transparentCorners = false;


     //   var canvas = new fabric.Canvas('canvas');



        





  var drawingModeEl = $('drawing-mode'),
      drawingOptionsEl = $('drawing-mode-options'),
      drawingColorEl = $('drawing-color'),
      drawingShadowColorEl = $('drawing-shadow-color'),
      drawingLineWidthEl = $('drawing-line-width'),
      drawingShadowWidth = $('drawing-shadow-width'),
      drawingShadowOffset = $('drawing-shadow-offset'),
      clearEl = $('clear-canvas');






  clearEl.onclick = function() { canvas.clear() };


canvas.on('mouse:down', function(options) {
  console.log(options.e.clientX, options.e.clientY);
});

canvas.on('mouse:move', function(options) {
  console.log(options.e.clientX, options.e.clientY);
});
canvas.on('mouse:up', function(options) {
  console.log(options.e.clientX, options.e.clientY);
});

canvas.on('Rect:added', function() {
  console.log('added a rectangle' + Rect);
});




  drawingModeEl.onclick = function() {
   // console.log(JSON.stringify(canvas, null, 2));
    
    // canvas.isDrawingMode = true;
   canvas.isDrawingMode = !canvas.isDrawingMode;
    //console.log(JSON.stringify(canvas, null, 2));
    if (canvas.isDrawingMode) {
      drawingModeEl.innerHTML = 'Cancel drawing mode';
      drawingOptionsEl.style.display = '';
    }
    else {
      drawingModeEl.innerHTML = 'Enter drawing mode';
      drawingOptionsEl.style.display = 'none';
    }
  };








  if (fabric.PatternBrush) {
    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    vLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    hLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 10);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var squarePatternBrush = new fabric.PatternBrush(canvas);
    squarePatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 2;

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
      var ctx = patternCanvas.getContext('2d');

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);

      return patternCanvas;
    };

    var diamondPatternBrush = new fabric.PatternBrush(canvas);
    diamondPatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 5;
      var patternCanvas = fabric.document.createElement('canvas');
      var rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: this.color
      });

      var canvasWidth = rect.getBoundingRectWidth();

      patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
      rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

      var ctx = patternCanvas.getContext('2d');
      rect.render(ctx);

      return patternCanvas;
    };

    // var img = new Image();
    // img.src = '../assets/honey_im_subtle.png';

    // var texturePatternBrush = new fabric.PatternBrush(canvas);
    // texturePatternBrush.source = img;
  }










  $('drawing-mode-selector').onchange = function() {

    if (this.value === 'hline') {
      canvas.freeDrawingBrush = vLinePatternBrush;
    }
    else if (this.value === 'vline') {
      canvas.freeDrawingBrush = hLinePatternBrush;
    }
    else if (this.value === 'square') {
      canvas.freeDrawingBrush = squarePatternBrush;
    }
    else if (this.value === 'diamond') {
      canvas.freeDrawingBrush = diamondPatternBrush;
    }
    else if (this.value === 'texture') {
      canvas.freeDrawingBrush = texturePatternBrush;
    }
    else {
      canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
    }

    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = drawingColorEl.value;
      canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
      canvas.freeDrawingBrush.shadowBlur = parseInt(drawingShadowWidth.value, 10) || 0;
    }
  };

  drawingColorEl.onchange = function() {
    canvas.freeDrawingBrush.color = this.value;
  };
  drawingShadowColorEl.onchange = function() {
    canvas.freeDrawingBrush.shadowColor = this.value;
  };
  drawingLineWidthEl.onchange = function() {

    console.log(JSON.stringify(canvas, null, 2));



    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;

    this.previousSibling.innerHTML = this.value;

  };
  drawingShadowWidth.onchange = function() {
    canvas.freeDrawingBrush.shadowBlur = parseInt(this.value, 10) || 0;
    this.previousSibling.innerHTML = this.value;
  };
  drawingShadowOffset.onchange = function() {
    canvas.freeDrawingBrush.shadowOffsetX =
    canvas.freeDrawingBrush.shadowOffsetY = parseInt(this.value, 10) || 0;
    this.previousSibling.innerHTML = this.value;
  };

  if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    canvas.freeDrawingBrush.shadowBlur = 0;
  }

// shapes

  $('shape-selector').onchange = function() {
console.log(this.value);
    if (this.value === 'Line') {
      canvas.add();
    }
    else if (this.value === 'Circle') {
      canvas.add(new fabric.Circle({ top: 140, left: 230, radius: 75, fill: 'green' }));
    }
    else if (this.value === 'Square') {
      canvas.add();
    }
    else if (this.value === 'Triangle') {
      canvas.add(new fabric.Triangle({ top: 300, left: 210, width: 100, height: 100, fill: 'blue' }));
    }
    else if (this.value === 'Rectangle') {

            var rect = new fabric.Rect({
            top : 100,
            left : 100,
            width : 60,
            height : 70,
            fill : 'red'
        });
        canvas.add(rect);
        console.log("rectangle added");
    }
   else if (this.value === 'Ellipse') {
      
    }
      else if (this.value === 'Polygon') {
      
    }
      else if (this.value === 'Group') {
      
    }
      else if (this.value === 'Image') {
      //   fabric.Image.fromURL('../lib/pug.jpg', function(img) {
      // canvas.add(img.set({ left: 400, top: 350, angle: 30 }).scale(0.25));
  // });
    }





  };






