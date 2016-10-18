// create a module, create a controller, and define functions to handle tasks. Then we can apply to view.
// create an angular module
var app = angular.module('taskManagerApp', []);

// create a controller passing in $scope to store tasks and $http for routing
app.controller('appController', function($scope, $http) {

  $scope.formData = {};
  $scope.quotes = ['nicely done', 'keep going'];

  // on page load make the following requests:
  
  // get request to get quote of the day from theysaidso.com API on initial page load
  $http.get('http://quotes.rest/qod.json')
    .success(function(quote) {
      $scope.quote = quote.contents.quotes[0].quote;
    })
    .error(function(quote) {
      console.log('error getting quote', quote);
    });

  // get request to '/tasks' to get all tasks as a res and display them on page load
  $http.get('/tasks')
    .success(function(taskData) {
      $scope.tasks = taskData;
    })
    .error(function(taskData) {
      console.log('error retrieving data', taskData);
    });


  // function for creating a task
  $scope.createTask = function() {
    // post request to '/tasks' to post a task and add it to the db and add it to taskData object to show on page
    $http.post('/tasks', $scope.formData)
      .success(function(taskData) {
        $scope.tasks = taskData;
        $scope.formData = {};
        console.log(taskData.length);
      })
      .error(function(taskData) {
        console.log('error posting task', taskData);
      });
  };


  // function for deleting a task(takes in a task id as an argument)
  $scope.deleteTask = function(id) {
    // delete request to '/tasks/id'
    $http.delete('/tasks/' + id)
      .success(function(taskData) {
        $scope.tasks = taskData;
        console.log(taskData.length);
        // alert('Task completed! Nicely done.');
        // alert($scope.quotes[0]);

      })
      .error(function(taskData) {
        console.log('error deleting task', taskData);
      });
  };

});




