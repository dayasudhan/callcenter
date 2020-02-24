var mongoose = require('mongoose');
//Schema
var GrahakInfoSchema = new mongoose.Schema({
	id:String,
	phone:Number,
	name:String,
	personalemail: String,
	dob:String,
	salary:Number,
	status:String,
	assigneduser:String,
	tracker:[{status: String,time:Date,reason:String}],
	addresses:[{label:String, 
		addressline:String,
		landMark:String
		 }],
	officeemail:String,
	companyname:String,
	companycategory:String,
	alternatephone:Number,
	doctocollect:[],
	otherrequirements:String	,
	customerstatus:String,
	meetingtime:String	
    });

//Model
var GrahakInfoModel = mongoose.model( 'GrahakInfoSchema',GrahakInfoSchema );

module.exports = GrahakInfoModel;