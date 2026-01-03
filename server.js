
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const app = express();
app.use(cors()); app.use(express.json({limit:'15mb'}));

// connect DB
const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/quickapp';
mongoose.connect(MONGO).then(()=>console.log('Mongo connected')).catch(e=>console.error(e));

// health
app.get('/api/health', (req,res)=>res.json({ ok:true, ts: Date.now() }));

// mount routes (placeholders for now)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/live', require('./routes/live'));
app.use('/api/books', require('./routes/books'));
app.use('/api/music', require('./routes/music'));
app.use('/api/quickride', require('./routes/quickride'));
app.use('/api/tv', require('./routes/tv'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/chat', require('./routes/chat'));

// server + socket.io (chat + live signaling)
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', socket => {
  console.log('socket connected', socket.id);
  socket.on('joinRoom', ({room}) => socket.join(room));
  socket.on('leaveRoom', ({room}) => socket.leave(room));
  socket.on('chatMessage', msg => { if(msg.room) io.to(msg.room).emit('chatMessage', msg); });
  socket.on('offer', data => { if(data.room) io.to(data.room).emit('offer', data); });
  socket.on('answer', data => { if(data.room) io.to(data.room).emit('answer', data); });
  socket.on('ice-candidate', data => { if(data.room) io.to(data.room).emit('ice-candidate', data); });
  socket.on('liveGift', data => { if(data.room) io.to(data.room).emit('liveGift', data); });
  socket.on('typing', info => { if(info.room) io.to(info.room).emit('typing', info); });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>console.log('Backend listening on', PORT));
