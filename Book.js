
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  seller:{type:Schema.Types.ObjectId, ref:'User'}, title:String, description:String, priceKES:Number, mediaUrl:String, createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Book', BookSchema);
