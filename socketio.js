//
var instance;

// function ioInit(server) {
//   var io = require('socket.io')(server);
//
//   io.on ("connection", function(socket) {
//     socket
//     .on()
//     .on('newCard', function(data) {
//       console.log("new", data.list);
//     })
//   })
//   return io;
// }



module.exports =
{
  getInstance: function() {
    return instance;
  }
  setup: function(server) {
    var instance = require('socket.io')(server);

    io.instance ("connection", function(socket) {
      socket
      .on()
      .on('newCard', function(data) {
        console.log("new", data.list);
      })
    });
  }
};
