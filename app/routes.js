var CustomerInfoModel = require('../app/models/customerInfo');
var ExecutiveInfoModel = require('../app/models/executiveInfo');
var GrahakModel = require('../app/models/grahak');
var CountersModel = require('../app/models/counters');
var OtpModel = require('../app/models/otp');
var Firebase = require("firebase");
var multer = require('multer');
var path = require('path');
 //var sleep = require('sleep');
// var Excel = require("exceljs");
// var workbook = new Excel.Workbook();
var Client = require('node-rest-client').Client;
var client = new Client();
var options = multer.diskStorage({ destination : 'public/images/logo/' ,
  filename: function (req, file, cb) {
    cb(null, req.params.id + path.extname(file.originalname));
  }
});
var upload = multer({ storage: options });
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



// normal routes ===============================================================

// show the home page (will also have our login links)
app.get('/test', function(req, res) {
    res.render('index.ejs');
});

// app.get('/', function (req, res) {
//     if(req.isAuthenticated())
//         res.render('customer', { user : req.user });
//     else
//         res.render('customer', { user : "dummy" });
// });

// app.get('/p/customer_menu', function (req, res) {
//     if(req.isAuthenticated())
//         res.render('customer_menu', { user : req.user });
//     else
//         res.render('customer_menu', { user : "dummy" });
// });

// PROFILE SECTION =========================
app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user
    });
});

// LOGOUT ==============================
app.get('/logout', function(req, res) {
  console.log('/logout');
  var redirect_url = '/';
    req.logout();
    res.redirect(redirect_url);
});

app.get('/vendor_logout', function(req, res) {
    var redirect_url = '/vendor';
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
            if(req.body.role == 'customer')
            {
                //redirect_url = '/signup';
                console.log("error in login 1");
                 return res.send("0"); 
            }
            else if(req.body.role == 'vendor') 
            {
                redirect_url = '/p/vendor_signup';
                return res.redirect(redirect_url); 
            }
            else if(req.body.role == 'manager')
            {
                redirect_url = '/p/manager_executive';
                return res.redirect(redirect_url);
            }
            else if(req.body.role == 'executive')
            {
               
                return res.send("Error in Login , user not registered");
            }
            else if(req.body.role == 'CSR')
            {
               
                return res.send("Error in Login , user not registered");
            }
            
    }
    console.log("login start1");
    req.logIn(user, function(err) {
        console.log("login start2");
      if (err) { return next(err); }
      console.log(req.body.role);
      console.log("login");
      var redirect_url = '/';
      if(req.body.role == 'customer')
      {
        //redirect_url = '/';

           console.log("success in login 1");

        // return CustomerInfoModel.find({ 'phone':req.body.email},function( err, customerInfo ) {
        //     if( !err ) {
        //         return res.send( customerInfo );
        //     } else {
        //         console.log( err );
        //         return res.send('ERROR');
        //     }
        // });
 
        return res.send("1"); 
      }
       else if(req.body.role == 'vendor') 
       {
        redirect_url = '/p/customer_details';
         return res.redirect(redirect_url);
       }
       else if(req.body.role == 'manager')
       {
        redirect_url = '/p/manager_executive';
        return res.redirect(redirect_url);
       }
       else if(req.body.role == 'CSR')
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

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

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

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

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

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

app.get('/executive', function (req, res) {
    res.render('executive_login', { user : req.user });
});
app.get('/', function (req, res) {
    res.render('executive_login', { user : req.user });
});
//app.get('/find', function (req, res) {
//    res.render('find', { user : req.user });
//});



app.get('/p/executive_login', function (req, res) {
    res.render('executive_login', { user : req.user });
});
app.get('/p/manager_executive', function (req, res) {
    res.render('manager_executive', { user : req.user });
});
app.get('/p/CSR_list', function (req, res) {
    res.render('CSR_list', { user : req.user });
});
app.get('/p/executive_signup', function(req, res) {
    res.render('executive_signup', { });
});
app.get('/p/executive_details', function(req, res) {
    res.render('executive_details', { user : req.user });
});

app.get('/about_us', function (req, res) {
    res.render('about_us', { user : req.user });
});

app.get('/admin', function (req, res) {
    res.render('admin_login', { user : req.user });
});

app.get('/p/admin_order/:id', function (req, res) {
    console.log(req.user);
    res.render('admin_order', { user : req.user, id:req.params.id});
});
app.get('/p/admin_order_today', function (req, res) {
    console.log(req.user);
    res.render('admin_order_today', { user : req.user });
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

app.get('/p/student_details', function (req, res) {
    res.render('student_details', { user : req.user });
});

app.get('/p/student_attendence', function (req, res) {
    res.render('student_attendence', { user : req.user });
});
app.get('/p/student_markssheet', function (req, res) {
    res.render('student_markssheet', { user : req.user });
});
app.get('/p/vendor_login', function (req, res) {
    res.render('vendor_login', { user : req.user });
});

app.get('/p/vendor_signup', function(req, res) {
    res.render('vendor_signup', { });
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
              if(req.body.role == 'customer')
              {
                  redirect_url = '/signup';
                  return res.send("0");
              }
              else if(req.body.role == 'vendor') 
              {
                  redirect_url = '/p/vendor_signup';
              } 
              if(req.body.role == 'CSR')
              {
                //  redirect_url = '/p/executive_signup';
                  return res.send("Error In registering the CSR");
              }
              return res.redirect(redirect_url); 
       }
      req.logIn(user, function(err) {
        console.log('/signup 6' );
        if (err) { return next(err); }
        console.log(req.body.role);
        var redirect_url;
        if(req.body.role == 'customer')
        {
       
          registerCustomer(req, res, function(data){
            console.log("423")
            console.log(data);
           return  res.send(data);
          });
        }
        else if(req.body.role == 'vendor') 
        {
          redirect_url = '/p/customer_details';
          registerVendor(req, res, next);
          return res.redirect(redirect_url);
        }
        else if(req.body.role == 'executive') 
        {
          redirect_url = '/p/executive_details';
         // registerExecutive(req, res, next);
          return res.redirect(redirect_url);
        }
        else if(req.body.role == 'CSR') 
        {
          //redirect_url = '/p/executive_details';
          registerExecutive(req, res, function()
          {
            res.send('Success');
          });
          //return res.redirect(redirect_url);
        }
        else
        {
        return res.redirect(redirect_url);
      }
      });
    })(req, res, next);
});
function registerCustomer(req, res, next) {
  console.log("/registerCustomer");
  var cus_id = "C";
  var res = getNextSequence('customer',function(data) {

    cus_id = cus_id + data.sequence;
    console.log(cus_id);
      var customerInfo = new CustomerInfoModel({
        email:req.body.email2,
        id:cus_id,
        phone:req.body.email,
        name:req.body.name
      });

      customerInfo.save( function( err ) {
        if( !err ) {
              console.log( 'registerCustomer created' );
              console.log(req.body.email);
                  req.session.save(function (err) {
                    if (err) {
                        console.log( 'registerCustomer save error' );
                       next(err);
                    }
                    console.log( 'registerCustomer save complete' );
                  });
                  console.log( '463' );
               next(customerInfo);
              } else {
                console.log( 'registerCustomer error' );
                console.log( err );
                return res.send('ERROR');
              }
        });
    });
};
app.get( '/v1/executive/infoall', function( request, response ) {
    console.log("/v1/executive/infoall");
  	if(checkVendorApiAunthaticated(request,0) == false)
	{
		return response.send("Not aunthiticated").status(403);
	}
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
          userid:req.body.email
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
  console.log(req.body[0] );
  
  //console.log(req.body[1]);
 // var data = JSON.parse(req.body);
  var data = JSON.parse(JSON.stringify(req.body).replace(/\s(?=\w+":)/g, ""));
   console.log(data);
//   console.log(data.length);
//   console.log(data[0].MobNo);
  var taskid = "T";
  var i;
  
  var indiantime = new Date();
indiantime.setHours(indiantime.getHours() + 5);
indiantime.setMinutes(indiantime.getMinutes() + 30);
  for( i = 0; i< 5 ;i++)
  {
    setTimeout(function() {
    var res = getNextSequence('task',function(sequencedata) {
        var ntaskid = taskid + sequencedata.sequence;
    var grahakInfo = new GrahakModel({
        phone:data[i].MobNo ,
        name:data[i].CusName ,
        assigneduser:"Manager",
        id:ntaskid,
        status:data[i].status,
        income:data[i].Income,
        tracker:  [{status:data[i].status,time:indiantime,reason:data[i].Remark}]  ,
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
      
          
       
      //  sleep.msleep(1000);             
    });
}, 1000);
  }
  // return res.send('done');
});
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
app.get( '/v1/test/customer', function( req, res ) {
                req.body.email = "dayasudhankggg@gmail.com";
                req.body.phoneNumber = "9987";
                req.body.name = "dayas";
                  registerCustomer2(req, res,function(data)
                  {
                     return res.send(data);
                  });

});

function registerCustomer2(req, res, next)
{
        console.log("/registerCustomer2");
        var cus_id = "C";
        var result = getNextSequence('customer',function(data) {

          cus_id = cus_id + data.sequence;
          console.log(cus_id);
          console.log(req.body);
          console.log(req.body.phoneNumber);
          var phoneNumber = parseInt(req.body.phoneNumber);
          console.log(phoneNumber);
          return CustomerInfoModel.findOneAndUpdate({ 'phone':phoneNumber},
            {
                  $set:{email:req.body.email,
                  name:req.body.name}
            },
            function( err,customer ) {
                if( !err ) {
                    if(customer == null)
                    {
                        console.log( "empty" );
                        var customer = new CustomerInfoModel({
                                  email:req.body.email,
                                  id:cus_id,
                                  phone:req.body.phoneNumber,
                                  name:req.body.name
                        });
                     
                        console.log(req.body);
                        customer.save( function( err ) {
                            if( !err ) {
                                console.log( 'created' );
                                next( customer );
                            } else {
                             console.log( 'error' );
                                console.log( err );
                                next(err);
                            }
                        });
                    } 

                    console.log("register2 ");
                    console.log(customer);
                    return  next(customer);
            } else {
                console.log( err );
                return next('ERROR');
            }
        });

  });
};
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
app.get( '/v1/grahak/infoall', function( request, response ) {
    console.log("GET --/v1/school/info/all");
   	// if(checkVendorApiAunthaticated(request,1) == false && request.isAuthenticated() == false)
	// {
	// 	return response.send("Not aunthiticated").status(403);
	// }
    return GrahakModel.find(function( err, vendor ) {
        console.log("GrahakModel.find");
        if( !err ) {
            console.log(vendor);
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

function registerVendor(req, res, next) {
    console.log("/registerVendor");
    console.log(req.body.email);
    var hotel_id = "R";
    var res = getNextSequence('manager',function(data) {
  
      hotel_id = hotel_id + data.sequence;
      console.log(hotel_id);
  
        var vendorInfo = new SchoolModel({
          username:req.body.email,
          id:hotel_id
        });
        vendorInfo.save( function( err ) {
          if( !err ) {
                console.log( 'registerVendor created' );
                console.log(req.body.email);
                    req.session.save(function (err) {
                      if (err) {
                          console.log( 'registerVendor save error' );
                        return next(err);
                      }
                      console.log( 'registerVendor save complete' );
                    });
                return ;
                } else {
                  console.log( 'registerVendor error' );
                  console.log( err );
                  return response.send('ERROR');
                }
          });
      });
  };
//module.exports = router;
}