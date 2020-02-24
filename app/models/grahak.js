var mongoose = require('mongoose');
//Schema
var GrahakInfoSchema = new mongoose.Schema({
	id:String,
	phone:Number,
	name:String,
	email: String,
	DOB:String,
	Salary:Number,
	status:String,
	assigneduser:String,
	tracker:[{status: String,time:Date,reason:String}],
	addresses:[{label:String, 
		addressLine1:String,
		addressLine2:String,
		street:String, 
		LandMark:String, 
		areaName:String,
		city:String, 
		zip:String, 
		latitude:Number,
		longitude:Number }],
	officialmailid:String,
	companyname:String,
	alternatephoneno:Number,
	doctocollect:[{name:String}],
	OtherRequirement:String	
    });

//Model
var GrahakInfoModel = mongoose.model( 'GrahakInfoSchema',GrahakInfoSchema );

module.exports = GrahakInfoModel;