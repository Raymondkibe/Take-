
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RideSchema = new Schema({
  rider:{type:Schema.Types.ObjectId, ref:'User'}, driver:{type:Schema.Types.ObjectId, ref:'User'}, pickup:Schema.Types.Mixed, destination:Schema.Types.Mixed, fareKES:Number, status:{type:String, default:'searching'}, createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Ride', RideSchema);
