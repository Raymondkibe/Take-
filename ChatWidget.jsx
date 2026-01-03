
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io();
export default function ChatWidget({ room }){
  const [messages,setMessages] = useState([]);
  const [text,setText] = useState('');
  useEffect(()=>{ socket.emit('joinRoom',{ room }); socket.on('chatMessage', m=> setMessages(prev=>[...prev,m])); return ()=>socket.disconnect(); },[room]);
  const send = ()=>{ socket.emit('chatMessage',{ room, text }); setText(''); };
  return (<div className='chat'><div className='messages'>{messages.map((m,i)=><div key={i}>{m.text}</div>)}</div><input value={text} onChange={e=>setText(e.target.value)} /><button onClick={send}>Send</button></div>);
}
