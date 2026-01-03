
import React from 'react';
export default function GiftButton({ liveId, gift }){
  const sendGift = async ()=>{ await fetch('/api/live/gift',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ liveId, giftId: gift._id, fromUserId: 'demo' }) }); };
  return (<button className='gift-btn' onClick={sendGift}>{gift.name} - KES {gift.priceKES}</button>);
}
