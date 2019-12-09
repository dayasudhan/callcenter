var mongoose = require('mongoose');
//Schema
var SchoolSchema = new mongoose.Schema({
	
    id:String,
    phone:Number,
    email:String,
    name:String,
    username:String,
    address:{
        label:String, 
        addressLine1:String,
        addressLine2:String,
        street:String, 
        LandMark:String, 
        areaName:String,
        city:String, 
        zip:String, 
        latitude:Number,
        longitude:Number 
    },
    studentInfo:{
        id:String,
        phone:Number,
        email:String,
        name:String,
        standard:String,
        section:String,
        gender:String,
        dob:String,
        bloodGroup:String,
        isDayschooler:String,
        admissionNo:String,
        admissionDate:String,
        schoolid:String,
        attendence:{

        },
        marks_sheet:[{subject_name:String, date_of_exam:String,score:String,status:String,title:String,action:String}],
       
        address:{
            label:String, 
            addressLine1:String,
            addressLine2:String,
            street:String, 
            LandMark:String, 
            areaName:String,
            city:String, 
            zip:String, 
            latitude:Number,
            longitude:Number 
        },
        parent_info:
            {
            father_name:String,
            father_phone:Number,
            father_email:String,
            father_profession:String,
            mother_name:String,
            mother_phone:Number,
            mother_email:String,
            mother_profession:String
            },
        },
        vaninfo:{
            driverinf:{

            },treackinfo:{

            }
        }
   });


//Model
var  SchoolModel = mongoose.model( 'SchoolSchema', SchoolSchema );

module.exports =  SchoolModel;