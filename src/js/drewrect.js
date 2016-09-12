(function () {
  var
    $canvas = $('#canvas'),
    ctx = $canvas[0].getContext('2d'),
    offset = $canvas.offset(),
    draw,
    handle;

  handle = {
    color: '#666',
    dim: { w: 20, h: canvas.height },
    pos: { x: 0, y: 0 }
  };
  
  $canvas.on({
    'mousedown.slider': function (evt) {
      var grabOffset = {
        x: evt.pageX - offset.left - handle.pos.x,
        y: evt.pageY - offset.top - handle.pos.y
      };

      // simple hit test
      if (   grabOffset.x >= 0
          && grabOffset.x <= handle.dim.w
          && grabOffset.y >= 0
          && grabOffset.x <= handle.dim.h
      ) {
        $(document).on({
          'mousemove.slider': function (evt) {
            handle.pos.x = evt.pageX - offset.left - grabOffset.x;

            // prevent dragging out of canvas
            if (handle.pos.x < 0) {
              handle.pos.x = 0;
            }

            if (handle.pos.x + handle.dim.w > canvas.width) {
              handle.pos.x = canvas.width - handle.dim.w;
            }
            
            //handle.pos.y = evt.pageY - offset.top - grabOffset.y;
          },
          'mouseup.slider': function () {
            $(document).off('.slider');
          }
        });
      }
    }
  });

  draw = function() {
    var val = (100 * (handle.pos.x / (canvas.width - handle.dim.w))).toFixed(2) + '%';
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = handle.color;
    ctx.fillRect(handle.pos.x, handle.pos.y, handle.dim.w, handle.dim.h);
    
    ctx.textBaseline = 'hanging';
    ctx.font = '12px Verdana';
    ctx.fillStyle = '#333';
    ctx.fillText(val, 4, 4);
    ctx.fillStyle = '#fff';
    ctx.fillText(val, 3, 3);
  };

  setInterval(draw, 16);
});