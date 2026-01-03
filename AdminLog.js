
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminLog = new Schema({ adminId:{type:Schema.Types.ObjectId, ref:'User'}, action:String, meta:Schema.Types.Mixed, createdAt:{type:Date, default:Date.now} });
module.exports = mongoose.model('AdminLog', AdminLog);
