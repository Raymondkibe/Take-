
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LiveSchema = new Schema({
  host:{type:Schema.Types.ObjectId, ref:'User'}, title:String, isBattle:{type:Boolean, default:false},
  viewers:{type:Number, default:0}, giftsTotal:{type:Number, default:0}, recordedUrl:String,
  startedAt:Date, endedAt:Date, status:{type:String, default:'live'}
});
module.exports = mongoose.model('LiveStream', LiveSchema);
