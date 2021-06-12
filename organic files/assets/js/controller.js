// myAngular=angular.module("myAngular",[]);
// myAngular.controller("myControl1",function($scope){
// 	$scope.firstName="Aytaj";
// 	$scope.lastName="Amirova";
// 	$scope.fullName=function(){
// 		return $scope.firstName + ' '+ $scope.lastName;
// 	}

// 	$scope.names=["Aytac","Aynur","Aysel","Arife","Sema","Adile"];
// });


//   myApp=angular.module("myAngular",[]);
//   myApp.controller("myController",function($scope){
// 	$scope.color="black;"
// 	$scope.today=new Date();
// 	$scope.names={
// 		"Name":"Aytac",
// 		"Age":20,
// 		"Weight":56
// 	};

// 	$scope.numbers=123;
// 	$scope.txt="AngularJS egitim setime hos geldiniz";
// 	$scope.languages=["HTML","CSS","JAVASCRIPT","ANGULARJS","REACTJS"]
	
// });
		myAngular=angular.module('myAngular',[]);
			myAngular.controller('filterControl',function($scope){
				$scope.names=[
					{name:"Aytac",language:"HTML"},
					{name:"Ayten",language:"CSSS"},
					{name:"John",language:"Turkish"},
					{name:"Murat",language:"English"}
				];
				$scope.siralaBeni=function(par){
					$scope.beniYaz=par;
				}

				$scope.languages=["html","css","javascript","angularjs","reactjs"]
			});


  myAngular.filter("myCustomFormat",function(){
		return function(par){
			var i,harf,kelime='';
			for(i=0;i<par.length;i++){
				harf=par[i];
				if(i%2 == 0){
					harf=harf.toUpperCase();
				}
				kelime+=harf;
			}
			return kelime;
		}
  });
  
  


/* myApp=angular.module("myApp",[]); 
myApp.controller("servicesControl",function($scope,$location){
	$scope.message=$location.absUrl();
	$scope.message=$location.protocol();

})*/

//  myApp=angular.module("myApp",[]); 
// myApp.controller("servicesControl",function($scope,$http){
// 	$http.get("deneme.html").then(function(response){
// 		$scope.message=response.data;
// 	});
// });
