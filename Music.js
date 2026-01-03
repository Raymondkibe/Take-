
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MusicSchema = new Schema({
  artist:{type:Schema.Types.ObjectId, ref:'User'}, title:String, url:String, priceKES:Number, downloads:{type:Number,default:0}, createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Music', MusicSchema);
