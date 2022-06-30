const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);



app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended:true}));


io.on("connection",function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update",username + " has joined the conversation");
    });

    socket.on("exit",function(username){
        socket.broadcast.emit("update",username + " has left the conversation");
    });

    socket.on("chat",function(message){
        socket.broadcast.emit("chat", message);
    });
});

// app.get("/",function(req,res){
//     res.sendFile("/index.html");
// })

server.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});