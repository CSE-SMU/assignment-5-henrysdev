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
    //name = $scope.form.name;                                          // called when the search button is clicked
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',               // the link to my proxy
      params: {                                                           // sets the GET params
        name: $scope.form.name,
        abv: $scope.form.abv,
        isOrganic: $scope.form.organic
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
  //$scope.beers.data = BeerData.data;


                                                                          // test to make sure that the data got passed through
  // $scope.playlists = [
  //   // {title: 'asdf', name: '-', abv: 3.2, beer_id:1}
  //                                                     // this should be updated to contain the beer data
  //   { title: 'Reggae', beer_id: 1 },
  //   { title: 'Chill', beer_id: 2 },
  //   { title: 'Dubstep', beer_id: 3 },
  //   { title: 'Indie', beer_id: 4 },
  //   { title: 'Rap', beer_id: 5 },
  //   { title: 'Cowbell', beer_id: 6 }
    
  // ];
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