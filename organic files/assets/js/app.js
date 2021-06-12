var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope) {
     $scope.todoList = [{todoText:'Eat', done:false},
                      {todoText:'Sleep', done:false},
                      {todoText:'Code', done:false},
                      {todoText:'Repeat', done:false}];  // Stores Task

    $scope.todoAdd = function() {
    	//put the Task into list
        $scope.todoList.push({todoText:$scope.todoInput, done:false}); 
        $scope.todoInput = ""; //reset the input text field
    };

    //For Removing Task From List 
    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.todoList.push(x);
        });
    };
});