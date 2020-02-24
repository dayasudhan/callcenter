var mongoose = require('mongoose');
//Schema
var ExecutiveInfoSchema = new mongoose.Schema({
	id:String,
	phone:Number,
	name:String,
	email: String,
	userid:String
    });

//Model
var ExecutiveInfoModel = mongoose.model( 'ExecutiveInfoSchema', ExecutiveInfoSchema );

module.exports = ExecutiveInfoModel;