app = angular.module("executiveModule", []);

  app.controller("mainController", function ($rootScope,$scope, $http, jsonFilter)
  {
          var config = {	    		  
            headers: {
                'securekey': 'RN4CDXkqltLF%2FWloegKujIhiaSWBrgCzQXqI9cyWpT0',
            'client':'pickcock',
            'version':'1'
          }
      };
      $scope.addCustomerDetails = function (param) {
        console.log("addCustomerDetails 1");
        console.log($scope.executivename);
        console.log($scope.executivephone);
        console.log(param);
        var url = "/v1/executive/info/";
        // url = url + param;
        var postData={
          phone:$scope.executivephone,
          name:$scope.executivename,
          email:$scope.executiveemail,
          userid:param
         };
        $http.post(url,postData)
          .success(function (data, status, headers, config)
          {
            console.log("addExecutiveDetails success");
            alert("addExecutiveDetails success");
          })
          .error(function (data, status, headers, config)
          {
          console.log("addExecutiveDetails error");
           alert("addExecutiveDetails error");
          });
        };
        $scope.getOrders = function () {
          console.log("getLeads");
      // $scope.init() ;
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
      $scope.getcustomerbyid = function (param) {
        console.log("getLeads");
    // $scope.init() ;
     console.log("getLeads 2");
        var url = "/v1/grahak/infobyid/";
        url = url + param;
        console.log(url);
      
        $http.get(url,config)
          .success(function (data, status, headers, config)
          {
           console.log(data);
           console.log(data[0].name);
           console.log(data[0].id);
           console.log(data[0].phone);
           $scope.customer = data[0];
           console.log($scope.customer.name);
           console.log($scope.customer.id);
           console.log($scope.customer.phone);
        //   angular.forEach($scope.orderlist, function(item) {
        //     var timestamp = item._id.toString().substring(0,8);
        //     item.date = new Date( parseInt( timestamp, 16 ) * 1000 );
        //   //  item.date.setTimezone("Asia/kolkata");
        //     console.log(item._id);
        //    console.log(item.date);
        //   });
        //  console.log("timestamp 2");
          })
          .error(function (data, status, headers, config)
          {
            $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
          });
    };
      $scope.changestatus = function(parama,param2)
      {
        // alert(param2);
         alert(parama);
        $rootScope.id = parama;
        window.open("/p/customer_details/"+parama, "_blank");
      };
     
  });