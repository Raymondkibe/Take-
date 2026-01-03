
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Post = require('./models/Post');
const Book = require('./models/Book');
const Music = require('./models/Music');
const TVChannel = require('./models/TVChannel');
async function run(){
  const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/quickapp';
  await mongoose.connect(MONGO);
  console.log('connected to', MONGO);
  await User.deleteMany({});
  const adminPass = process.env.ADMIN_PASS || 'admin123';
  const adminHash = await bcrypt.hash(adminPass, 10);
  const admin = new User({ name:'Admin', email: process.env.ADMIN_EMAIL || 'admin@quickapp.com', passwordHash: adminHash, roles:['admin'], activated:true });
  await admin.save();
  const u1 = new User({ name:'Janet', phone:'+254700000001', referralCode:'JANET1', activated:true }); await u1.save();
  const u2 = new User({ name:'Ann', phone:'+254700000002', referralCode:'ANN2', referrer:u1._id, activated:true }); await u2.save();
  await Post.create({ author:u1._id, type:'video', title:'Promo', body:'Video promo', mediaUrl:'https://placehold.co/600x400', paid:true, likes:450 });
  console.log('seeded demo users and posts');
  process.exit(0);
}
run().catch(e=>{ console.error(e); process.exit(1); });
