
import React, { useState } from 'react';
import axios from 'axios';
export default function FollowButton({ userId, targetId }){
  const [following,setFollowing] = useState(false);
  const toggle = async ()=>{ await axios.post('/api/users/follow',{ userId, targetId }); setFollowing(!following); };
  return (<button className='follow-btn' onClick={toggle}>{following? 'Following' : 'Follow'}</button>);
}
