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
	$scope.changestatus = function(parama,param2)
	{
		alert(param2);
		alert(parama.changestatususerid);
		$scope.changestatususerid = parama.changestatususerid;
		
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
	  
		
  });



