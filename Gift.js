
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GiftSchema = new Schema({
  name:String, priceKES:Number, animation:String, createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Gift', GiftSchema);
