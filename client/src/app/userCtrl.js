app.controller('userCtrl', [ '$scope', '$http','$location', 'growl','$q',
	function($scope, $http, $location,  growl, $q){

		$scope.uploadfile = function(){
			$http.post('/upload',$scope.file).then(function(data){
				console.log('success');
				// $scope.sectionList = data;
			}).catch(function(error){
				growl.addErrorMessage('oops! Something went wrong');
			})
		}

		$scope.onFileSelect = function($files){
			$scope.file = $files[0].name;
			console.log($scope.file);
		}
		$scope.hola = function(){
			console.log('Hola');
		}
		$scope.submit  = function () {
        var defer = $q.defer();
				console.log($scope.user);
        $http.post('/user', $scope.user).success(function (resp) {
					getAll().then(function (response) {
							$scope.Lusers = response;
					});
            defer.resolve(resp);
        }).error(function (err) {
            defer.reject(err);
        });
        return defer.promise;
    }
		var getAll = function () {
		var defer = $q.defer();
		$http.get('/user').success(function (resp) {
				defer.resolve(resp);
		}).error(function (err) {
				defer.reject(err);
				console.log(defer.promise);
		});
   return defer.promise;
		}
		getAll().then(function (response) {
        $scope.Lusers = response;
    });

	}]
)
