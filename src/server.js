const express = require("express");
const app = express();

let broadcaster;
const port = 8080; // you can change port to fit with your server local ip

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);
app.use(express.static(__dirname));


io.sockets.on("connection", socket => {
  socket.on("broadcaster", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () => {
    socket.to(broadcaster).emit("watcher", socket.id);
  });
  socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
  });
  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
  });
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });
  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectClient", socket.id);
  });
});
io.sockets.on("error", e => console.log(e));
server.listen(port, () => console.log(`Server is running on port ${port}`));
