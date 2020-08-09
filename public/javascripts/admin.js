app = angular.module("adminModule", []);
  app.controller("adminController", function ($scope, $http, jsonFilter)
  {
		   $scope.total2 = 123;
		 
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
		 alert(param3);
		// alert(param.changestatususerid);
		//$scope.changestatususerid = param.changestatususerid;
		var url = "/v1/grahak/changestatus/";
		 url = url + param2;
		 var postData={
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
		  role:"CSR",
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
	  
		window.open("/p/admin_order/"+param, "_blank");
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
				  var url = "/v1/admin/exceldata/";
					var senddata = {data1:$scope.json_object};
					$http.post(url,$scope.json_object).success(function (data, status, headers, config)
					{
						console.log("addxlsheet success");
					})
					.error(function (data, status, headers, config)
					{
						console.log("addxlsheet error");
					});
				//  return json_object;
			  }
			  //console.log(jsonarray1[0]);
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



