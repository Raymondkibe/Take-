
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TxSchema = new Schema({
  user:{type:Schema.Types.ObjectId, ref:'User'}, type:String, amountKES:Number, currency:String, metadata:Schema.Types.Mixed, createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Transaction', TxSchema);
