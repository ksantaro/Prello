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
        socket.to(data.url).broadcast.emit("new list", data.data);
      })
      .on('deleteList', function(data) {
        socket.to(data.url).broadcast.emit("delete list", data.data);
      })
      .on('changeListTitle', function(data) {
        socket.to(data.url).broadcast.emit("change list title", data.data)
      })
      .on('newCard', function(data) {
        socket.to(data.url).broadcast.emit("new card", data.data);
      })
      .on("deleteCard", function(data) {
        socket.to(data.url).broadcast.emit("delete card", data.data);
      })
      .on("url", function(url) {
        socket.join(url);
      })
      .on("disconnect", function() {
        console.log("user disconnect");
      })
    });
  }
};
