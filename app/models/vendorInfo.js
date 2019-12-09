var mongoose = require('mongoose');
//Schema
// var VendorInfoSchema = new mongoose.Schema({
// 	hotel:{name:String,email: String,logo:String,id:String},
//     menu:[{name: String,  price:Number, availability:Number,timings:Number,description:String,logo:String}],
//     address:{addressLine1:String,addressLine2:String,street:String, LandMark:String, areaName:String,city:String, zip:String, latitude:Number,longitude:Number },
//     phone:Number,
//     vegornoveg: String,
//     speciality:String,
//     deliverRange: Number,
//     deliverAreas:[{name:String,isBulkAreaOnly:Number}],
//     deliverCharge:Number,
//     deliveryTime:Number,
//     minimumOrder:Number,
//     rating:Number,
//     uniqueid:String,
//     isOpen:Number,
//     orderAcceptTimings:{Morning:{startTime:String,endTime:String,available:String},
//                         Lunch:{startTime:String,endTime:String,available:String},
//                         Dinner:{startTime:String,endTime:String,available:String}
//                             },
//     isBulkVendor:Number,
//     bulkdeliverCharge:Number,
//     bulkdeliverRange: Number,
//     bulkminimumOrder:Number,
//     bulkdeliveryTime:Number
//     });
    var VendorInfoSchema = new mongoose.Schema({
        stationname:String,
        phone:Number,
        id:String,
        email:String,
        
        menu:[{
               feedername: String,  
               feederno:String,
               timings:{dayshift:{startTime:String,endTime:String,available:String},
                        nightshift:{startTime:String,endTime:String,available:String} },
               week:{startTime:String,endTime:String}
            }],
       
        });
//Model
var VendorInfoModel = mongoose.model( 'VendorInfoSchema', VendorInfoSchema );

module.exports = VendorInfoModel;