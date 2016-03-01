angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.factory('BeerData', function(){                                          // This factory stores information as a singleton so multiple controllers can access it
  return {data: {}};
})

.controller('SearchCtrl', function($scope, $state, $http, BeerData) {
     // use dependency injection to get the BeerData factory
  $scope.form = {};                                                       // used to store your form data
  $scope.search = function() {  
    //name = $scope.form.name;   
    _name = "";
    _organic = "";
    _abv_range = "";
    _ibu_range = "";

    if ($scope.form.abv_exact != null && $scope.form.abvmin == null && $scope.form.abvmax == null) 
    {
      _abv_range = $scope.form.abv_exact;
    }

    else if($scope.form.abvmin != null && $scope.form.abvmax != null)
    {
      _abv_range = $scope.form.abvmin + "," + $scope.form.abvmax;
    }

    else if($scope.form.abvmin == null && $scope.form.abvmax != null)
    {
      _abv_range = "-" + $scope.form.abvmax;
    }

    else if($scope.form.abvmin != null && $scope.form.abvmax == null)
    {
      _abv_range = "%2B" + $scope.form.abvmin;
    }

    if ($scope.form.ibu_exact != null) 
    {
      _ibu_range = $scope.form.ibu_exact;
    }

    if($scope.form.name != null)
    {
      _name = $scope.form.name;
    }

    if ($scope.form.isOrganic == "Y") {
      _organic = "Y";
    }
    else if($scope.form.isOrganic == "N")
    {
      _organic = "N";
    }


                                           // called when the search button is clicked
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',               // the link to my proxy
      params: {                                                           // sets the GET params
        abv: _abv_range,
        isOrganic: _organic,
        ibu_exact: _ibu_range,
        name: _name
      }
    }).then(function successCallback(response) {
      BeerData.data = response.data; 

      console.log("data--")                                   // save the response data in the factory
      $state.go('app.beers');                                             // go to the beer results state
    });   
  }
})

.controller('BeersCtrl', function($scope, BeerData) {
  $scope.beers = {};

  console.log(BeerData.data.data);
  $scope.playlists = BeerData.data.data;
  console.log($scope.playlists);
  
})


.controller('BeerCtrl', function($scope, $stateParams, BeerData) {   
  //console.log("akjsdlkfja")     // use dependency injection to get the BeerData factory
  //console.log($stateParams.id);   
                                        // test to make sure the id gets passed through the URL
  
  foundBeer = false;
  var i = 0;
  $scope.beer = BeerData.data.data[0];

  while(foundBeer == false)
  {
    $scope.beer = BeerData.data.data[i];
    if($scope.beer.id == $stateParams.id)
    {
      break;
    }
    else
    {
      i++;
    }
  }
  console.log("found this beer", $scope.beer);
  // make another http request to get the beer or...
  // loop through BeerData to find the beer with the same id
});