
import React from 'react';
export default function LivePlayer({ streamUrl }){
  return (<div className='live-player'><video src={streamUrl} controls autoPlay style={{width:'100%'}} /></div>);
}
