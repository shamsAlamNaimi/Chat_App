const express = require('express');
const socketio= require('socket.io');
const http= require('http');
const {addUser,removeUser,getUser,getUserInRoom} =require('./user');

const router= require('./router');
const PORT= process.env.PORT|| 5000;

const app= express();
const server= http.createServer(app);
const io= socketio(server);

app.use(router);
io.on('connection',(socket)=>{
    socket.on('join',({name,room},callback)=>{
        const {error,user}=addUser({id:socket.id,name,room});
        console.log("index user",user);
        if(error) {return callback(error)};
        socket.emit('message',{user:'admin',text:`${user.name}, welcome to the room ${user.room} `});
        socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name}, has joined`});
        socket.join(user.room);
        io.to(user.room).emit('roomData',{room:user.room, users:getUserInRoom(user.room)})
        callback();
    })

    socket.on('sendMessage',(message,callback)=>{
        const user= getUser(socket.id);
        io.to(user.room).emit('message',{user:user.name,text:message});
        

        callback();
    })


    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left.`})
            io.to(user.room).emit('roomData',{room:user.room, users:getUserInRoom(user.room)})
        }
    })
})

server.listen(PORT,()=> console.log('the server is connected on port ',PORT));