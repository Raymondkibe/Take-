
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  author:{type:Schema.Types.ObjectId, ref:'User'}, type:String, title:String, body:String, mediaUrl:String,
  paid:{type:Boolean, default:false}, likes:{type:Number, default:0}, createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Post', PostSchema);
