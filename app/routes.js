var CustomerInfoModel = require('../app/models/customerInfo');
var ExecutiveInfoModel = require('../app/models/executiveInfo');
var GrahakModel = require('../app/models/grahak');
var CountersModel = require('../app/models/counters');


var UserModel       = require('../app/models/user');



var securecustomerkey = 'EjR7tUPWx7WhsVs9FuVO6veFxFISIgIxhFZh6dM66rs';
var securevendorkey = 'ORql2BHQq9ku8eUX2bGHjFmurqG84x2rkDQUNq9Peelw';
var secureadminkey = 'tk0M6HKn0uzL%2FcWMnq3jkeF7Ao%2BtdWyYEJqPDl0P6Ac';
var securewebkey = 'RN4CDXkqltLF%2FWloegKujIhiaSWBrgCzQXqI9cyWpT0';
var version_value_1 = '1';
var client_key_vendor = 'tunga';
var client_key_customer = 'bhoomika';
var client_key_admin = 'gajanuru';
var client_key_web = 'pickcock';


module.exports = function(app, passport) {




// LOGOUT ==============================
app.get('/logout', function(req, res) {
  console.log('/logout');
  var redirect_url = '/';
    req.logout();
    res.redirect(redirect_url);
});

app.get('/vendor_logout', function(req, res) {
    var redirect_url = '/';
    req.logout();
    res.redirect(redirect_url);
});
// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================


        app.get('/login', function(req, res) {
            res.render('customer_login.ejs', { message: req.flash('loginMessage') });
        });



app.post('/v1/m/login', function(req, res, next) {
    console.log('post /v1/m/login');
     console.log(req.body);
  passport.authenticate('local-login', function(err, user, info) {
   
    if (err) {console.log('post /v1/m/login  1');return next(err); }
    if (!user) {
        console.log('post /v1/m/login  2');
        return res.send("0"); 
    }
    req.logIn(user, function(err) {
        console.log('post /v1/m/login  3');
      if (err) {
      console.log('post /v1/m/login 4'); 
      

        return next(err); }
       console.log("store the uniqui id") 
              storeVendoruniqueId(req,res,function(req,res){
           console.log("storeVendoruniqueId success");
           
        });
      return res.send("1");
    });
    console.log('post /v1/m/login 5');
  })(req, res, next);
});




app.post('/login', function(req, res, next) {
    console.log('post /login');
      console.log(req.body);
      

  passport.authenticate('local-login', function(err, user, info) {
    console.log("login authenticate");
    if (err) {
         console.log("error in login 0");
        return next(err); }
    if (!user) {
        console.log("error in !user");
         var redirect_url = '/';
        return res.send("Error in Login , user not registered");
           
    }
    console.log("login start1");
    req.logIn(user, function(err) {
        console.log("login start2");
      if (err) { return next(err); }
      console.log(req.body.role);
      console.log(user.local.role);
    //   console.log(user.local);
      console.log("login");
      var redirect_url = '/';
       if(user.local.role == 'manager')
       {
        redirect_url = '/p/leads';
        return res.redirect(redirect_url);
       }
       else if(user.local.role == 'admin')
       {
        redirect_url = '/p/leads';
        return res.redirect(redirect_url);
       }
       else if(user.local.role == 'CSR')
       {
         redirect_url = '/p/customer_list';
         return res.redirect(redirect_url);
       }
     
    });
  })(req, res, next);
  console.log("login authenticate post");
});
        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('customer_signup.ejs', { message: req.flash('signupMessage') });
        });

    

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

    

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

   

app.get('/', function (req, res) {
    res.render('login', { user : req.user });
});
//app.get('/find', function (req, res) {
//    res.render('find', { user : req.user });
//});



app.get('/p/login', function (req, res) {
    res.render('login', { user : req.user });
});
app.get('/p/addcsr', function (req, res) {
    console.log("/p/addcsr 1");
    console.log(req.user);
    console.log("/p/addcsr 2");
    res.render('addcsr', { user : req.user });
});
app.get('/p/CSR_list', function (req, res) {
    res.render('CSR_list', { user : req.user });
});
// app.get('/p/executive_signup', function(req, res) {
//     res.render('executive_signup', { });
// });
app.get('/p/addmanager', function(req, res) {
    res.render('addmanager',  { user : req.user });
});


app.get('/p/customer_view/:id', function (req, res) {
    console.log(req.user);
    res.render('customer_view', { user : req.user, id:req.params.id});
});
app.get('/p/leads', function (req, res) {
    console.log(req.user);
    res.render('leads', { user : req.user });
});
app.get('/p/load_xl', function (req, res) {
    console.log(req.user);
    res.render('load_xl', { user : req.user });
});
app.get('/p/customer_details/:id', function (req, res) {
    console.log(req.user);
    console.log(req.params.id);
    res.render('customer_details', { user : req.user,id:req.params.id });
});
app.get('/p/customer_list', function (req, res) {
    console.log(req.user);
    res.render('customer_list', { user : req.user });
});


app.post('/reset', function(req, res, next) {
console.log(req.body);
  if(req.body.password != req.body.password2)
  {
     
  console.log("password mimatchmatch");
     return res.send('ERROR');
  }
  else
  {
    console.log("password match");
  }
  console.log('/reset');
    passport.authenticate('local-reset', function(err, user, info) {
     console.log(req.body);
      if (err) { 
        return next(err); }
      if (!user) { 
          return res.send("0");
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log(req.body.role);
        var redirect_url;
        if(req.body.role == 'customer')
        {
       
         return CustomerInfoModel.find({ 'phone':req.body.email},function( err, customerInfo ) {
            if( !err ) {
                return res.send( customerInfo );
            } else {
                console.log( err );
                return res.send('ERROR');
            }
        });
 
        return res.send("1");
        }
       
      });
    })(req, res, next);
});


app.post('/signup', function(req, res, next) {
console.log(req.body);
//console.log(user);/p
  if(req.body.password != req.body.password2)
  {
     
  console.log("password mimatchmatch");
     return res.send('password mimatchmatch');
  }
  else
  {
    console.log("password match");
  }
  console.log('/signup 2');
    passport.authenticate('local-signup', function(err, user, info) {
     console.log(req.body);
     console.log('/signup 3');
      if (err) { 
        console.log('/signup 4' );
        return next(err); }
      if (!user) { 
        console.log('/signup 5' );
          var redirect_url = '/';
        
                  return res.send("Error In registering the CSR");
           
       }
      req.logIn(user, function(err) {
        console.log('/signup 6' );
        if (err) { return next(err); }
        console.log(req.body.role);
        var redirect_url;
       
        if(req.body.role == 'CSR') 
        {
          //redirect_url = '/p/executive_details';
          registerExecutive(req, res, function()
          {
            res.send('Success');
          });
        }
        else if(req.body.role == 'manager')
        {
          registerExecutive(req, res, function()
          {
            res.send('Success');
          });
        }
        else if(req.body.role == 'admin')
        {
          registerExecutive(req, res, function()
          {
            res.send('Success');
          });
        }

      });
    })(req, res, next);
});

// };
app.get( '/v1/executive/infoall', function( request, response ) {
    console.log("/v1/executive/infoall");
  
    return ExecutiveInfoModel.find(function( err, order ) {
        if( !err ) {
            console.log("no error");
            return response.send( order );
        } else {
            console.log("error");
            console.log( err );
            return response.send('ERROR');
        }
    });
});
function registerExecutive(req, res, next) {
    console.log("/registerExecutive");
    var cus_id = "E";
    var res = getNextSequence('executive',function(data) {
  
      cus_id = cus_id + data.sequence;
      console.log(cus_id);
        var customerInfo = new ExecutiveInfoModel({
          email:req.body.userid,
          id:cus_id,
          phone:req.body.phone,
          name:req.body.name,
          userid:req.body.email,
          role:req.body.role
        });
  
        customerInfo.save( function( err ) {
          if( !err ) {
                console.log( 'registerExecutive created' );
                console.log(req.body.email);
                    req.session.save(function (err) {
                      if (err) {
                          console.log( 'registerExecutive save error' );
                         next(err);
                      }
                      console.log( 'registerExecutive save complete' );
                    });
                    console.log( '463' );
                 next("Success");
               // return res.send('Success');
                } else {
                  console.log( 'registerExecutive error' );
                  console.log( err );
                  return res.send('ERROR');
                }
          });
      });
  };
  app.post( '/v1/admin/exceldata/',function( req, res ) {
 
  console.log("VendorLogo post");
//  console.log(req.body[0] );

  var data = JSON.parse(JSON.stringify(req.body).replace(/\s(?=\w+":)/g, ""));

  
  var i;
  
  
  for( i = 0; i< data.length ;i++)
  {
    savegrahkinfo(data[i],req,res);
    console.log(i);
    console.log(data[i].MobNo);
  }
  // return res.send('done');
});
function savegrahkinfo(data,req,res)
{
    console.log(data.CusName);
    var taskid = "T";
    var indiantime = new Date();
    indiantime.setHours(indiantime.getHours() + 5);
    indiantime.setMinutes(indiantime.getMinutes() + 30);
 var res = getNextSequence('task',function(sequencedata) {
        var ntaskid = taskid + sequencedata.sequence;
    var grahakInfo = new GrahakModel({
        phone:data.MobNo ,
        name:data.CusName ,
        assigneduser:"Manager",
        id:ntaskid,
        status:data.status,
        income:data.Income,
        tracker:  [{status:data.status,time:indiantime,reason:data.Remark}]  ,
      });
      grahakInfo.save( function( err ) {
        if( !err ) {
              console.log( 'grahakInfo created' );
              req.session.save(function (err) {
                    if (err) {
                        console.log( 'grahakInfo save error' );
                      return next(err);
                     
                    }
                    console.log( 'grahakInfo save complete' );
                    
                  });
             // return ;
              } else {
                console.log( 'grahakInfo error' );
                console.log( err );
                return res.send('ERROR');
              }
        });    
           
    });

}
//   app.post( '/v1/admin/loadexcel/',function( req, res ) {
//     console.log("commentInfo post");
//     console.log(req.body);
  
//     var filePath =req.body.filepath;
//     console.log(filePath);
//     workbook.xlsx.readFile(filePath).then(function () {
//         console.log("111");
//         //Use sheetName in getWor console.log(workbook);
//         var worksheet = workbook.getWorksheet("SheetInfo");
//         console.log("222");
        
//         workbook.eachSheet(function(worksheet, sheetId) {
//             console.log(worksheet.getRow('1').getCell(1).value);
//             console.log(worksheet.getRow('2').getCell(1).value);
//             console.log(worksheet.getRow('3').getCell(2).value);
//             worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
//                 console.log("Current Row:" + rowNumber);
//                 //Second iterator for cells in row
//                 row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
//                 //print row number, column number and cell value at[row][col]
//                 console.log("Cell Value= " + cell.value  + " col no= " + colNumber);
                
//                         });
//               });

//               ////

             
//               ////
//           });
//       });
//   // return res.send("done");
// });


function getNextSequence(name,result)
{
   
    var ret = CountersModel.findOneAndUpdate(
            { _id: name },
            { $inc: { sequence: 1 }} ,
        function( err, order ) 
        {
        if( !err ) {
            console.log("no error");
            console.log(order);
            ret2 = order;
            result(order);
           // return order;
         
        } else {
            console.log( err );
           result(err);
        }
    });

}

function checkVendorApiAunthaticated(request,type)
{
	console.log("checkVendorApiAunthaticated 1");
	console.log(request.headers);
	console.log(request.headers.version);
	var version = parseInt(request.headers.version);
	console.log(version);
	var ret = false; 
	if(request.headers.securekey == secureadminkey && request.headers.client == client_key_admin)
	{
		console.log("checkVendorApiAunthaticated admin");
		ret = true;
	}
	else if(request.headers.securekey == securewebkey &&
		      request.headers.version == version_value_1 && 
		      request.headers.client == client_key_web)
	{
		console.log("checkVendorApiAunthaticated web pass");
		ret = true;
	}
	else if(type == 1)
	{
		console.log("checkVendorApiAunthaticated vendor");
		if(request.headers.securekey == securevendorkey &&
			      request.headers.version == version_value_1 && 
			      request.headers.client == client_key_vendor)
		{
			console.log("checkVendorApiAunthaticated vendor pass");
			ret = true;
		}
	}
	else if(type == 2)
	{
		console.log("checkVendorApiAunthaticated cust");
		if(request.headers.securekey == securecustomerkey &&
			      request.headers.version == version_value_1 && 
			      request.headers.client == client_key_customer)
		{
			console.log("checkVendorApiAunthaticated cust pass");
			ret = true;
		}
	}
	else
	{
		console.log("checkVendorApiAunthaticated not auth");
		ret = false;
    }
    return ret = true;
	return ret;
}
app.delete( '/v1/admin/counters/:id', function( request, response ) {
  	if(checkVendorApiAunthaticated(request,0) == false)
	{
		return response.send("Not aunthiticated").status(403);
	}
        return CountersModel.remove( { '_id':request.params.id},function( err ) {
            if( !err ) {
                console.log( 'counter removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});

app.get( '/v1/admin/counters', function( request, response ) {
    console.log("/v1/admin/counters");
  	if(checkVendorApiAunthaticated(request,0) == false)
	{
		return response.send("Not aunthiticated").status(403);
	}
    return CountersModel.find(function( err, order ) {
        if( !err ) {
            console.log("no error");
            return response.send( order );
        } else {
            console.log("error");
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.post( '/v1/admin/counters/:id', function( request, response ) {
    console.log("post /v1/admin/counters");
  	if(checkVendorApiAunthaticated(request,0) == false)
	{
		return response.send("Not aunthiticated").status(403);
	}
    console.log(request.params.id);
     //var dd = {'cityName':"dvg",'subAreas':[{'name':"rajajinagar"},{'name':"vijaynagar"}]};
     var dd = {_id:request.params.id,
                sequence:0};
    console.log("post /v1/admin/counters 2");
      var counters = new CountersModel(
         dd);
         console.log("post /v1/admin/counters 3");
        return counters.save(function( err) {
        if( !err ) {
            console.log("no error");
            console.log(counters);
            return response.send(counters);
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    {
      console.log("isLoggedIn");
        return next();
    }
    else
    {
       console.log("not loggedin isLoggedIn");
    }

    res.redirect('/');
}
app.get( '/v1/grahak/infobyassigneduser/:id', function( request, response ) {
    console.log("GET --infobyassigneduser");
    return GrahakModel.find({'assigneduser':request.params.id},function( err, vendor ) {
        if( !err ) {
            console.log(vendor);
            return response.send( vendor );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.delete( '/v1/grahak/:id', function( request, response ) {
      return GrahakModel.remove( { 'id':request.params.id},function( err ) {
          if( !err ) {
              console.log( 'customer record removed' );
              return response.send( '' );
          } else {
              console.log( err );
              return response.send('ERROR');
          }
      });
  //});
});

app.post( '/v1/grahaklist', function( request, response ) {
  console.log(request.body.list);
 
  return GrahakModel.deleteMany( { 'id':{'$in':request.body.list}},function( err ) {
      if( !err ) {
          console.log( 'customer records removed' );
          return response.send( '' );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });

});
app.delete( '/v1/grahakall', function( request, response ) {
  return GrahakModel.deleteMany({},function( err ) {
      if( !err ) {
          console.log( 'customer all record removed' );
          return response.send( '' );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
//});
});
app.get( '/v1/grahak/infobyid/:id', function( request, response ) {
    console.log("GET --/v1/school/info/");

    return GrahakModel.find({ 'id':request.params.id},function( err, vendor ) {
        if( !err ) {
            console.log(vendor);
            return response.send( vendor );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.get( '/v1/User/infoall', function( request, response ) {
    console.log("GET --/v1/school/info/all");
   	// if(checkVendorApiAunthaticated(request,1) == false && request.isAuthenticated() == false)
	// {
	// 	return response.send("Not aunthiticated").status(403);
	// }
    return UserModel.find(function( err, vendor ) {
        console.log("GrahakModel.find");
        if( !err ) {
          //  console.log(vendor);
            return response.send( vendor );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.get( '/v1/grahak/infoall', function( request, response ) {
    console.log("GET --/v1/school/info/all");
   	// if(checkVendorApiAunthaticated(request,1) == false && request.isAuthenticated() == false)
	// {
	// 	return response.send("Not aunthiticated").status(403);
	// }
    return GrahakModel.find(function( err, vendor ) {
        console.log("GrahakModel.find");
        if( !err ) {
          //  console.log(vendor);
            return response.send( vendor );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.post( '/v1/grahak/changestatus/:id', function( request, response ) {
    // if(checkVendorApiAunthaticated(req,1) == false && req.isAuthenticated() == false)
    // {
    //     return res.send("Not aunthiticated").status(403);
    // }
    var indiantime =  new Date();
    //  indiantime.setHours(indiantime.getHours() + 5);
    //  indiantime.setMinutes(indiantime.getMinutes() + 30);
     var date = indiantime.toDateString(); 
     var time = indiantime.toLocaleTimeString(); 
     var status_time  =  date + " " + time;
     console.log(status_time);
     console.log(date);
     console.log(time);
    return GrahakModel.findOneAndUpdate({ 'id':request.params.id},
    { 
        assigneduser:request.body.userid,
        status:request.body.status,
        $addToSet: {tracker: {$each:[{status: request.body.status,  
            time:status_time,
            changedbyuserid:request.body.changedbyuserid,
            reason:request.body.reason}] }}
      },
        function( err, order ) {
      if( !err ) {
          console.log("no error");
          
          return response.send("success");
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
      });
app.post( '/v1/grahak/info2/:id', function( request, response ) {

      console.log("storegrahakInfo post");
      console.log(request.body);
      var address = {label:request.body.addresslabel, 
      addressline:request.body.address,
      landMark:request.body.landmark};
      console.log(address);

			var  date = new Date( request.body.dob);

var mtime = new Date(request.body.meetingtime);
             var date2 = mtime.toDateString(); 
             var time = mtime.toLocaleTimeString(); 
             var meeting_time  =  date2 + " " + time;

      return GrahakModel.findOneAndUpdate({ 'id':request.body.id},
      { 
          personalemail:request.body.personalemail,
          dob:date.toDateString(),
          salary:request.body.salary,
          //status:String,
          //assigneduser:String,
        //   tracker:[{status: String,time:Date,reason:String}],
          addresses:address,
          officeemail:request.body.officeemail,
          companyname:request.body.companyname,
          companycategory:request.body.category,
          alternatephone:request.body.alternatephone,
          doctocollect:request.body.doctocollect,
          otherrequirements:request.body.otherrequirements,
          customerstatus:request.body.customerstatus,
          meetingtime:meeting_time
        //  $addToSet: {tracker: {$each:[{status: request.body.status,  time:indiantime,reason:request.body.reason}] }}
        },
          function( err, order ) {
        if( !err ) {
            console.log("no error");
            console.log(order);
            return response.send("success");
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    
      });
    });
app.post( '/v1/grahak/info/:id', function( req, res ) {
// if(checkVendorApiAunthaticated(req,1) == false && req.isAuthenticated() == false)
// {
//     return res.send("Not aunthiticated").status(403);
// }
    console.log("storegrahakInfo post");
    console.log(req.body);
    storegrahakInfo(req,res,function(req,res){
            console.log("storegrahakInfo success");
            
        });

    });
      app.post( '/v1/executive/info/', function( req, res ) {
        // if(checkVendorApiAunthaticated(req,1) == false && req.isAuthenticated() == false)
        // {
        //     return res.send("Not aunthiticated").status(403);
        // }
          console.log("storeexecutiveInfo post");
          console.log(req.body);
          registerExecutive(req,res,function(req,res){
                   console.log("storeexecutiveInfo success");
                   
                });
        
          });

function storegrahakInfo(request,response,callback,params)
{
console.log("GrahakModel");
console.log(request.params.id);
console.log(request.body);
var indiantime = new Date();
// indiantime.setHours(indiantime.getHours() + 5);
// indiantime.setMinutes(indiantime.getMinutes() + 30);
var taskid = "T";
var res = getNextSequence('task',function(data) {
    taskid = taskid + data.sequence;
var grahakInfo = new GrahakModel({
    phone:request.body.phone ,
    name:request.body.name ,
    assigneduser:"Manager",
    id:taskid,
    status:"New",
    tracker:  [{status:"New",time:indiantime,reason:""}]  ,
  });
  grahakInfo.save( function( err ) {
    if( !err ) {
          console.log( 'grahakInfo created' );
          request.session.save(function (err) {
                if (err) {
                    console.log( 'grahakInfo save error' );
                  return next(err);
                }
                console.log( 'grahakInfo save complete' );
              });
          return ;
          } else {
            console.log( 'grahakInfo error' );
            console.log( err );
            return response.send('ERROR');
          }
    });
}); 
}


//module.exports = router;
}