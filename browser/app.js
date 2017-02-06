//(function () {
  var whiteboard = require('./whiteboard.js'); //whiteboard
  var io = require('socket.io-client'); //socket.io

  var socket=io();

  //var whiteboard = window.whiteboard;
  //var socket = window.io(window.location.origin);
  // window.io(http://localhost:1337);

  socket.on('connect', function () {
    console.log('Connected!');
  });

  socket.on('load', function (strokes) {

    strokes.forEach(function (stroke) {
      var start = stroke.start;
      var end = stroke.end;
      var color = stroke.color;
      whiteboard.draw(start, end, color, false);
    });

  });

  socket.on('draw', function (start, end, color) {
    whiteboard.draw(start, end, color, false);
  });

  whiteboard.on('draw', function (start, end, color) {
    socket.emit('draw', start, end, color);
  });

//})();

