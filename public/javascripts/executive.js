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
      $scope.phonenumber = function (inputtxt) {
        console.log("phonenumber 1 ", inputtxt);
        //console.log($scope.selected[address.label]);
        var phoneno = /(?:\s+|)((0|(?:(\+|)91))(?:\s|-)*(?:(?:\d(?:\s|-)*\d{9})|(?:\d{2}(?:\s|-)*\d{8})|(?:\d{3}(?:\s|-)*\d{7}))|\d{10})(?:\s+|)/;
        if (phoneno.test(inputtxt)) {
            return true;
        } else {

            return false;
        }
    }

    $scope.emailid = function (inputtxt) {
        console.log("email 1 ", inputtxt);
        //console.log($scope.selected[address.label]);
        var mailid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
        if (mailid.test(inputtxt)) {
            return true;
        } else {

            return false;
        }
    }
  //   function hasWhiteSpace(s) {
  //     return s.indexOf(' ') >= 0;
  // }
      $scope.addCustomerDetails = function (param) {
        console.log("addCustomerDetails 1");
        console.log(param);
        console.log($scope.customer);
        if ($scope.customer.phone == "" || $scope.customer.phone == null ) {
          window.alert("Invalid Phone Number");
        } 
        else if (!$scope.phonenumber($scope.customer.phone)) {
          window.alert("Invalid Phone Number");
        }
        else if ($scope.customer.customerstatus == "" || $scope.customer.customerstatus == null ) {
          window.alert("Customer Status  Empty");
        }
        else if ($scope.customer.alternatephone == "" || $scope.customer.alternatephone == null) {
          window.alert("Invalid Alternate Phone Number");
        } 
        else if (!$scope.phonenumber($scope.customer.alternatephone)) {
          window.alert("Invalid Alternate Phone Number");
        }

        else if ($scope.customer.dob == "" || $scope.customer.dob == null ) {
          window.alert("Date of Birth  Empty");
        }
        else if ($scope.customer.salary == "" || $scope.customer.salary == null ) {
          window.alert("Salary  Empty");
        }
        else if ($scope.customer.companyname == "" || $scope.customer.companyname == null ) {
          window.alert("Company Name Empty");
        }
        else if ($scope.customer.category == "" || $scope.customer.category == null ) {
          window.alert("Company Category Empty");
        }
        else if ($scope.customer.address == "" || $scope.customer.address == null ) {
          window.alert("Address Empty");
        }
        else if ($scope.customer.addresslabel == "" || $scope.customer.addresslabel == null ) {
          window.alert("Address  Type Empty");
        }
        else if ($scope.customer.landmark == "" || $scope.customer.landmark == null ) {
          window.alert("Landmark Empty");
        }
        else if (!$scope.emailid($scope.customer.personalemail)) {
          window.alert("Invalid  E-Mail");
        }
       else if (!$scope.emailid($scope.customer.officeemail)) {
          window.alert("Invalid Office E-Mail");
        }
        else if ($scope.customer.doctocollect == "" || $scope.customer.doctocollect == null ) {
          window.alert("Documents Empty");
        }
        else if ($scope.customer.meetingtime == "" || $scope.customer.meetingtime == null ) {
          window.alert("Company Meeting Empty");
        }
        else if ($scope.customer.otherrequirements == "" || $scope.customer.otherrequirements == null ) {
          window.alert("Other Requirements Empty");
        }
        else{
            var url = "/v1/grahak/info2/param";
            // url = url + param;
            var postData=$scope.customer;
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
        }
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
      $scope.getOrdersbyassigneduser = function (param) {
        console.log("getLeads");
    // $scope.init() ;
     console.log("getLeads 2");
        var url = "/v1/grahak/infobyassigneduser/";
        url = url + param;
        console.log(url);
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
           console.log($scope.customer.addresses[0]);
           $scope.addresslabel = $scope.customer.addresses[0].label;
           $scope.addresslandMark = $scope.customer.addresses[0].landMark;
           $scope.addressaddressline = $scope.customer.addresses[0].addressline;
           console.log($scope.addresslabel);
           console.log($scope.addresslandMark);
           console.log($scope.addressaddressline);
           $scope.dob = new Date($scope.customer.dob);
           $scope.meetingtime = new Date($scope.customer.meetingtime);
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
      $scope.openItem = function(parama)
      {
        // alert(param2);
      //   alert(parama);
        $rootScope.id = parama;
        window.open("/p/customer_details/"+parama, "_blank");
      };
     
  });