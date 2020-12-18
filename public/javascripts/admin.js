app = angular.module("adminModule", []);

  app.controller("adminController", function ($scope, $http, $filter,jsonFilter)
  {
		   $scope.total2 = 123;
		   $scope.checkStatus = false; 
		   var config = {	    		  
  	    		  headers: {
  	       		    'securekey': 'RN4CDXkqltLF%2FWloegKujIhiaSWBrgCzQXqI9cyWpT0',
  				    'client':'pickcock',
  				    'version':'1'
  				  }
			};
			
	  $scope.init = function()
	  {
		var url = "/v1/executive/infoall";
		//url = url + param;
		$scope.executiveuserid = [];
		$scope.deletelist = [];
		$http.get(url,config)
		  .success(function (data, status, headers, config)
		  {
			$scope.executivelist = data;
			$scope.executivetotal = data.length;
	console.log(data);
		  angular.forEach($scope.executivelist, function(item) {
			var userid = item.userid;
			$scope.executiveuserid.push(userid);
		  //  item.date.setTimezone("Asia/kolkata");
	
		  });
		}).error(function (data, status, headers, config)
		  {
			$scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
		  });
		  console.log($scope.executiveuserid );
	  }
	  $scope.checkAll = function () {
		 
		  $scope.checkStatus = !$scope.checkStatus;
		  console.log($scope.checkStatus);
		  $scope.deletelist = new Array();
		  if($scope.checkStatus)
		  {
	    	angular.forEach($scope.orderlist, function(item) {
		     	$scope.deletelist.push(item.id);
			});

		}
		// else{
		// 	$scope.deletelist = new Array();
		// }
		console.log($scope.deletelist)
	  }
	  $scope.checkItem = function (param) {
		console.log(param)
		const isInArray = $scope.deletelist.includes(param);
		console.log(isInArray); // true
		//alert(isInArray);
		if(isInArray)
		{
			const index = $scope.deletelist.indexOf(param);
			console.log(isInArray); // true
				if (index > -1) {
					console.log(index); // true
					$scope.deletelist.splice(index, 1);
				}
		}
		else{
			$scope.deletelist.push(param);
		}
		console.log($scope.deletelist)

	  }


	  $scope.DeleteButton = function () 
	  {
		
		
		var url = "/v1/grahaklist";
		var postData={
			list:$scope.deletelist
		   };
		   $http.post(url,postData)
		   .success(function (data, status, headers, config)
		   {
			console.log("success list");
			alert("Deletion Successfull")
			location.reload()
		   })
		   .error(function (data, status, headers, config)
		   {
			console.log("error delete list");
		   });
	  }
  	  $scope.getOrders = function () {
      console.log("getLeads");
	 $scope.init() ;
	 console.log("getLeads 2");
      var url = "/v1/grahak/infoall";
      //url = url + param;
      $http.get(url,config)
        .success(function (data, status, headers, config)
        {
          $scope.orderlist = data;
          $scope.total2 = data.length;

        angular.forEach($scope.orderlist, function(item) {
          var timestamp = item._id.toString().substring(0,8);
          item.date = new Date( parseInt( timestamp, 16 ) * 1000 );
        //  item.date.setTimezone("Asia/kolkata");
         // console.log(item._id);
        // console.log(item.date);
        });
       console.log("timestamp 2");
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
	};
	//$filter('filter')(array, expression, comparator, anyPropertyKey)
	$scope.searchText = "";
	$scope.filteredlist2 =function(){
		return $scope.orderlist;
	}
//	$filter('filter')(employees, {name:"Joe"});
	$scope.filteredlist = $filter('filter')(function()
	{
		alert("filteredlist");
		console.log("filteredlist");
		return $scope.orderlist;
	});
	$scope.filteredPeople = $filter('filter')($scope.orderlist, function(person){
		console.log("filteredPeople");
		return /^ffff.*/g.test(person.assigneduser);
	});
	$scope.filterEmployees = $filter('filter')($scope.orderlist ,'T');
	// 	,function(order){
	// 	//return /^Jo.*/g.test(order.details.name);
	// 	return /^Jo.*/g.test(order.details.name);
	// });
	$scope.getOrdersById = function (param) {
		console.log("getOrdersById");
	  
	   console.log("getLeads 2");
		var url = "/v1/grahak/infobyid/";
		url = url + param;
		console.log(url);
		$http.get(url,config)
		  .success(function (data, status, headers, config)
		  {
			  console.log(data);
			$scope.order = data[0];
			console.log($scope.order);
			$scope.trackerstatus = data[0].tracker;
			console.log($scope.trackerstatus);
		 
		 console.log("timestamp 2");
		  })
		  .error(function (data, status, headers, config)
		  {
			$scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
		  });
	  };
	$scope.changestatus = function(param,param2,param3)
	{
		 //alert(param3);
		// alert(param.changestatususerid);
		//$scope.changestatususerid = param.changestatususerid;
		var url = "/v1/grahaklist2/changestatus";
		// url = url + param2;
		 var postData={
			list:$scope.deletelist,
			status:"Assigned",
			userid:param.changestatususerid,
			changedbyuserid:param3,
			reason:""
		   };
		$http.post(url,postData)
			.success(function (data, status, headers, config)
			{
			console.log("Change status success");
			alert("Change status success");
			})
			.error(function (data, status, headers, config)
			{
			console.log("Change status successr");
			alert("Change status success error");
			});
		  console.log($scope.executiveuserid );
	}
	$scope.getCSRDetails = function (param) {
        console.log("getCSRDetails");
        console.log(param);
      
        var url = "/v1/executive/infoall"; 
		$http.get(url,config)
        .success(function (data, status, headers, config)
        {
          $scope.csrlist = data;
          $scope.totalcsr2 = data.length;

        angular.forEach($scope.orderlist, function(item) {
          var timestamp = item._id.toString().substring(0,8);
          item.date = new Date( parseInt( timestamp, 16 ) * 1000 );
        //  item.date.setTimezone("Asia/kolkata");
          console.log(item._id);
         console.log(item.date);
        });
       console.log("timestamp 2");
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    
  
	  };
	  
	  $scope.addCSRDetails = function (param) {
		console.log("addCSRDetails 1");
		console.log(param);
		// console.log($scope.csremail);
		// console.log($scope.csrname);
		// console.log($scope.csrphone);
		// console.log($scope.csrusername);
		// console.log($scope.password);
		// console.log($scope.password2);
		// $scope.csrphone = "9876532202"
		// $scope.csremail = "dayasudhan@gmail.com"
	    var url = "/signup";
		// url = url + param;
		var postData={
		  phone:$scope.csrphone,
		  name:$scope.csrname,
		  email:$scope.csrusername,
		  userid:$scope.csremail,
		  password:$scope.password,
		  password2:$scope.password2,
		  role:param,
		 };
		$http.post(url,postData)
		  .success(function (data, status, headers, config)
		  {
			  console.log("addCSRDetails success");
			  //alert("CSR Added Successfully success");
			  alert(data);
  
  
		  })
		  .error(function (data, status, headers, config)
		  {
			console.log(data);
			 alert(data);
		  });
	  };
	  $scope.addManagerDetails = function (param) {
		console.log("addManagerDetails 1");
		// console.log($scope.csremail);
		// console.log($scope.csrname);
		// console.log($scope.csrphone);
		// console.log($scope.csrusername);
		// console.log($scope.password);
		// console.log($scope.password2);
		// $scope.csrphone = "9876532202"
		// $scope.csremail = "dayasudhan@gmail.com"
	    var url = "/signup";
		// url = url + param;
		var postData={
		  phone:$scope.csrphone,
		  name:$scope.csrname,
		  email:$scope.csrusername,
		  userid:$scope.csremail,
		  password:$scope.password,
		  password2:$scope.password2,
		  role:"manager",
		 };
		$http.post(url,postData)
		  .success(function (data, status, headers, config)
		  {
			  console.log("addCSRDetails success");
			  //alert("CSR Added Successfully success");
			  alert(data);
  
  
		  })
		  .error(function (data, status, headers, config)
		  {
			console.log(data);
			 alert(data);
		  });
	  };
	  $scope.openOrdersById = function (param) {
		console.log("getOrdersById");
	  
		window.open("/p/customer_view/"+param, "_blank");
	  };

  
	  $scope.addComment= function (param) {
		console.log("addComment 1");
		var url = "/v1/comment/info/";
		
  
		var fd = new FormData();
	   // console.log( $scope.files[0]);
  
		// var postData={
		//   heading:$scope.heading,
		//   description:$scope.description,
		// };
	   if($scope.files)
	   {
		fd.append("file",  $scope.files[0]);
		  }
	   else
	   {
		fd.append("file",  null);
		}
		  fd.append("data", JSON.stringify(postData));
		url = url + param;
	  $http.post(url,fd, {
		  withCredentials: true,
		  headers: {'Content-Type': undefined , 'enctype': 'multipart/form-data' },
		  transformRequest: angular.identity
		}).success(function (data, status, headers, config)
		  {
			  console.log("addComment success");
			  alert("addComment success");
  
		  })
		  .error(function (data, status, headers, config)
		  {
			console.log("addComment error");
			 alert("addComment error");
		  });
	  };
	  $scope.jsontoxlsheet= function (param) 	  {
		// var data = [
		// 	{ label: 'User', value: 'user' },
		// 	{ label: 'Age', value: function x(row) { return (row.age + ' years') } },
		// 	{ label: 'Phone', value: function x(row) { return (row.more ? row.more.phone || '' : '') } }
		//   ]
		// var results = [];
		// var searchField = "name";
		// var searchVal = "my Name";
		// for (var i=0 ; i < obj.list.length ; i++)
		// {
		// 	if (obj.list[i][searchField] == searchVal) {
		// 		results.push(obj.list[i]);
		// 	}
		// }
		  var listlength = $scope.orderlist.length;
		  var val= [];
		for (var i=0 ; i < listlength ; i++)
		{
			
			var  obj = {"Id":$scope.orderlist[i].id,
						"Name":$scope.orderlist[i].name,
						"Phone":$scope.orderlist[i].phone,
						"CustomerStatus": $scope.orderlist[i].status,
						"Alternatephone":$scope.orderlist[i].alternatephone,
						"Income": $scope.orderlist[i].Income,
						"DOB": $scope.orderlist[i].dob,
						"OfficeEmail": $scope.orderlist[i].officeemail,
						"CompanyName": $scope.orderlist[i].companyname,
						"CompanyCategory": $scope.orderlist[i].companycategory,
						"MeetingTime": $scope.orderlist[i].meetingtime,
						"Address": $scope.orderlist[i].addresses,
						"Tracker": $scope.orderlist[i].tracker
					
						
					}
						// personalemail: String,
						// dob:String,
						// salary:Number,
						// status:String,
						// assigneduser:String,
						// income:String,
						// tracker:[{status: String,time:String,reason:String,changedbyuserid:String}],
						// addresses:[{label:String, 
						// 	addressline:String,
						// 	landMark:String
						// 	 }],
						// officeemail:String,
						// companyname:String,
						// companycategory:String,
						// alternatephone:Number,
						// doctocollect:[],
						// otherrequirements:String	,
						// customerstatus:String,
						// meetingtime:String	
			val.push(obj);

}
			console.log(val);
	 	/* m:ake the worksheet */
			 var ws = XLSX.utils.json_to_sheet(val);

			/* add to workbook */
			var wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "Leads");

			/* generate an XLSX file */
			XLSX.writeFile(wb, "LeadsList.xlsx");
			// var content = [
			// 	{ user: 'Ana', age: 16, more: { phone: '11111111' } },
			// 	{ user: 'Luis', age: 19, more: { phone: '12345678' } },
			// 	{ user: null, age: 21, more: { phone: '87654321' } }
			//   ]
			//   var settings = {
			// 	sheetName: 'FirstSheet',
			// 	fileName: 'MySpreadsheet'
			//   }
	
			// let finalHeaders = ['colA', 'colB', 'colC'];
			// let data1 = [
			// 	[ { colA: 1, colB: 2, colC: 3 }, { colA: 4, colB: 5, colC: 6 }, { colA: 7, colB: 8, colC: 9 } ],
			// 	[ { colA:11, colB:12, colC:13 }, { colA:14, colB:15, colC:16 }, { colA:17, colB:18, colC:19 } ],
			// 	[ { colA:21, colB:22, colC:23 }, { colA:24, colB:25, colC:26 }, { colA:27, colB:28, colC:29 } ]
			// ];
				
			// if(typeof XLSX == 'undefined') XLSX = require('xlsx');
			
			// data.forEach((array, i) => {
			// 	console.log(XLSX.version);
			// 	let ws = XLSX.utils.json_to_sheet(array, {header: finalHeaders});
			// 	let wb = XLSX.utils.book_new()
			// 	XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
			// 	let exportFileName = `workbook_${i}.xls`;
			// 	XLSX.writeFile(wb, exportFileName)
			// });
	  }
	  $scope.addLogo = function (param,files) {
		console.log("addLogo");
	
		var fd = new FormData();
		console.log(files[0]);
		var xl2json = new ExcelToJSON();

		xl2json.parseExcel(files[0]);
//			console.log(postData[0]);

		   
	  };
	  var ExcelToJSON = function() {
		var jsonarray1 = [];
		var jsonobrtoret ;
		this.parseExcel = function(file) {
		  var reader = new FileReader();
	  
		  reader.onload = function(e) {
			var data = e.target.result;
			var workbook = XLSX.read(data, {
			  type: 'binary'
			});
	
			workbook.SheetNames.forEach(function(sheetName) {
			  // Here is your object
			  console.log(sheetName);
			 // XLSX.shee
			  var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
			//  var json_object = JSON.stringify(XL_row_object);
			console.log(XL_row_object);
			  var json_object = JSON.stringify(XL_row_object, null, 1).replace(/^ +/gm, " ").replace(/\n/g, "").replace(/{ /g, "{").replace(/ }/g, "}").replace(/\[ /g, "[").replace(/ \]/g, "]");
			//  console.log(json_object);
			  if(sheetName == "main csr calling sheet")
			  {
				  jsonarray1.push(json_object);
				  jsonobrtoret = json_object;
				  
				  $scope.json_object = json_object;
				  console.log($scope.json_object);
				//   var data12 = JSON.parse(JSON.stringify($scope.json_object).replace(/\s(?=\w+":)/g, ""));
				//   console.log(data12);
				//   console.log(data12[0]);
				  var url = "/v1/admin/exceldata/";
					var senddata = {data1:$scope.json_object};
					$http.post(url,$scope.json_object).success(function (data, status, headers, config)
					{
						console.log("addxlsheet success");
						window.alert("Excel sheet Added")
					})
					.error(function (data, status, headers, config)
					{
						console.log("addxlsheet error");
						window.alert("add Excel sheet error")
					});
				//  return json_object;
			  }
			  //console.log(jsonarray1[0]);git commit -m "alert after exlce sheet add"
			})
	  
		  };
	  
		  reader.onerror = function(ex) {
			console.log(ex);
		  };
	  
		  reader.readAsBinaryString(file);
		  return jsonobrtoret ;
		};
	  };
  });



