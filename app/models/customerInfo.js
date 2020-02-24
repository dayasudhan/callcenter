var mongoose = require('mongoose');
//Schema
var CustomerInfoSchema = new mongoose.Schema({
	id:String,
	phone:Number,
	name:String,
	email: String,
	addresses:[{label:String, 
		addressLine1:String,
		addressLine2:String,
		street:String, 
		LandMark:String, 
		areaName:String,
		city:String, 
		zip:String, 
		latitude:Number,
		longitude:Number }]
    });

//Model
var CustomerInfoModel = mongoose.model( 'CustomerInfoSchema', CustomerInfoSchema );

module.exports = CustomerInfoModel;