app.controller("crudController", function ($scope, crudService) {
	debugger;
	
	$scope.UserFormContainer = false;
	$scope.itemShowCount = ['5','10','20', '30'];
	$scope.typeList = [1,2,3,4,5,6,7,8,9,10];
	$scope.date = new Date();

	GetAllUsers();
	
	//To Get all users list
	function GetAllUsers () {
		var getUserData = crudService.getUsers();
		getUserData.then(function (user) {
			$scope.users = user.data.userList;
			//to select first item from ng-option list
			$scope.actItem = $scope.itemShowCount[0];
		}, function() {
			alert('Error in getting users list');
		});

	}

	$scope.editUser = function (user) {

        var getUserData = crudService.getUser(user.id);
	
		getUserData.then( function(_user) {
			$scope.user = _user.data;
			$scope.UserId = user.id
			$scope.PlazaRfc	= user.rfc;
			$scope.PlazaNombre	= user.nombre;
			$scope.PlazaCurp	= user.curp;
			$scope.PlazaCvepre	= user.cvepre;
			$scope.PlazaDesde	= user.desde;
			$scope.PlazaHasta	= user.hasta;
			$scope.PlazaMovimiento	= user.movimiento;
			$scope.PlazaCt	= user.ct;

			$scope.UserType	= user.type;
			var isActive = (user.active == 1) ? true : false;
			$scope.UserActiveChecked = isActive ;
			
			$scope.Action = "Update";
			$scope.UserFormContainer = true;
		}, function () {
			alert('Error in getting User record');
		});
	}

	// Hide Add User Form
	$scope.addUser = function () {
		ClearFields();
		$scope.Action = "Add";
		$scope.UserFormContainer = true;	
	}

	function ClearFields() {
        $scope.UserId = "";
        $scope.PlazaRfc = "";
        $scope.PlazaNombre	=  "";
		$scope.PlazaCurp	=  "";
		$scope.PlazaCvepre	=  "";
		$scope.PlazaDesde	=  "";
		$scope.PlazaHasta	=  "";
		$scope.PlazaMovimiento	=  "";
		$scope.PlazaCt	=  "";
    }
	
	// Hide Add / Update User Form
	$scope.closeFrmBtn = function () {
		$scope.UserFormContainer = false;
	}

	$scope.Cancel = function () {
		$scope.UserFormContainer = false;
	}

	//Add Update Action 
	$scope.AddUpdateUser = function () {
		var user = {
						rfc	: $scope.PlazaRfc,
						nombre	: $scope.PlazaNombre,
						curp	: $scope.PlazaCurp,
						cvepre	: $scope.PlazaCvepre,
						desde	: $scope.PlazaDesde,
						hasta	: $scope.PlazaHasta,
						movimiento	: $scope.PlazaMovimiento,
						ct	: $scope.PlazaCt
				};


		var getUserAction = $scope.Action;
		


		if(getUserAction == "Update"){

			user.userid = $scope.UserId;
			var getUserData = crudService.updateUser(user);
			
			getUserData.then (function (response) {
								GetAllUsers();
								var msg = response.data.msg;
								alert(msg);
							}, function () {
								alert('Error in updating User record');								
							});
			
		}else{
			//Add Use Code Come Here

			var addUserData = crudService.addUser(user);
			addUserData.then (function (response) {
								GetAllUsers();
								var msg = response.data.msg;
								alert(msg);
							}, function () {
								alert('Error in adding User record');								
							}
			);
		}

		$("[data-dismiss=modal]").trigger({ type: "click" });

		$scope.UserFormContainer = false;
	
	} // end of AddUpdateUser.

	$scope.deleteUser = function (user) {
		//console.log(user.id);
		var ans = confirm('Are you sure to delete it?');
		if(ans) {
			var delUserData = crudService.deleteUser(user.id);
			GetAllUsers();
			alert(delUserData.msg.data);
		}

	}
	

	$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

	$scope.activeChange = function() {
		$scope.search.active = ( ($scope.uActive) ? "1" : "0" );
	};
	
	
	$scope.reset = function(){
		$scope.search = '';
	};

});