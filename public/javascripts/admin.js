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
  	  $scope.getOrders = function () {
      console.log("getOrders");

      var url = "/v1/admin/order_all";
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
	  $scope.getTodayOrders = function () {
	      console.log("getTodayOrders");


	      var url = "/v1/vendor/orderall/today";
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
  });



