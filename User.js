
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name:String, email:{type:String, index:true, sparse:true}, phone:{type:String, index:true, sparse:true},
  passwordHash:String, roles:[String], activated:{type:Boolean, default:false},
  referralCode:String, referrer:{type:Schema.Types.ObjectId, ref:'User'},
  balances:{ referral:{type:Number,default:0}, postingCredit:{type:Number,default:0}, videos:{type:Number,default:0}, wallet:{type:Number,default:0} },
  followersCount:{type:Number, default:0}, followingCount:{type:Number, default:0},
  webauthn:Array, createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('User', UserSchema);
