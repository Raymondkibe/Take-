
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TVSchema = new Schema({ name:String, country:String, streamUrl:String, category:String, createdAt:{type:Date, default:Date.now} });
module.exports = mongoose.model('TVChannel', TVSchema);
