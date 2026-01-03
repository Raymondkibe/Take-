
import React from 'react';
import { Link } from 'react-router-dom';
export default function Sidebar(){ return (<aside className='sidebar'><div className='logo'>QUICKAPP</div><nav><Link to='/feed'>Feed</Link><Link to='/live'>Live</Link><Link to='/marketplace'>Marketplace</Link><Link to='/books'>Books</Link><Link to='/quickride'>QuickRide</Link><Link to='/wallet'>Wallet</Link><Link to='/profile'>Profile</Link></nav></aside>); }
