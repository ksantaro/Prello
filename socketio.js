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
  },
  setup: function(server) {
    instance = require('socket.io')(server);
    //console.log(instance);
    instance.on ("connection", function(socket) {
      console.log("a user connected");
      socket
      .on('newList', function(data) {
        socket.broadcast.emit("new list", data);
      })
      .on('deleteList', function(data) {
        socket.broadcast.emit("delete list", data);
      })
      .on('changeListTitle', function(data) {
        socket.broadcast.emit("change list title", data)
      })
      .on('newCard', function(data) {
        socket.broadcast.emit("new card", data);
      })
      .on("deleteCard", function(data) {
        socket.broadcast.emit("delete card", data);
      })
      .on("disconnect", function() {
        console.log("user disconnect");
      })
    });
  }
};
