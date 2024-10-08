// all our socket server stuff happens here.
const io = require("./server").io; /// here we are going inside our server.js and grabbing our io
io.on("connection", (socket) => {
  console.log(`${socket.id} has connected.`);
});
