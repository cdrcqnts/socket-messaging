var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/dashboard", function(req, res) {
  res.sendFile(__dirname + "/dashboard.html");
});

app.get("/text", function(req, res) {
  res.sendFile(__dirname + "/text.html");
});

io.on("connection", function(socket) {
  socket.broadcast.emit("Hi");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
  socket.on("message", function(msg) {
    io.emit("message", msg);
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
