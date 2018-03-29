

// var home;

var output = document.getElementById("out");

var profile = {
	home: {
		// longitude: 200,
		// latitude: -200
	},

};



		function getProfile() {
			return profile;
		}

		function updateHome(long, lat) {
			profile.home.longitude = long;
			profile.home.latitude = lat;
		};

		// function updateProfile(distance) {
		// 	if (distance > 200) {
		// 			// console.log('did you lock your door?')

		// 			profile.leftHome = true;

		// 			console.log(profile);
		// 		}

		// 		// if user is still at home

		// 		else {

		// 			// console.log('youre still at home, dum dum');
		// 			profile.leftHome = false;
		// 			console.log(profile);
		// 		}
		// };

		function updateProfile(flag) {
			profile.leftHome = flag;
		}



		// Establish user home coordinates

		function findHome() {


			function success (position) {

				// hypothetical push of user's home coordinates to backend

				updateHome(position.coords.longitude, position.coords.latitude);

				console.log(profile.home.longitude);
				console.log(profile.home.latitude);

			}

			function error () {
				console.log('error');
				var output = document.getElementById("out");

				output.innerHTML = '<p>Please enable Geolocation.</p>';
			}

			navigator.geolocation.getCurrentPosition(success, error);

		}

		// Establish user's current location and measure distance to home location

		function checkDoor () {

			function success (position) {

				// hypothetical API call for user profile information

				getProfile();

				var location = position.coords;

				//  conversion of degrees to radians

				function degreesToRadians(degrees) {
					return degrees * Math.PI / 180;
				}

				// calculation of distance in meters between home and current coordinates

				function distanceBetween(lat1, lon1, lat2, lon2) {

					var earthRadiusKm = 6371;

					var dLat = degreesToRadians(lat2-lat1);
					var dLon = degreesToRadians(lon2-lon1);

					lat1 = degreesToRadians(lat1);
					lat2 = degreesToRadians(lat2);

					var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					return (earthRadiusKm * c) * 1000;

				}

				var distanceHomeToCurrent = distanceBetween(profile.home.latitude, profile.home.longitude, location.latitude, location.longitude);

				// if distance between user location and home location is greater than 200 meters

				if (distanceHomeToCurrent > 200) {


					output.innerHTML = '<p>Did you lock the door?</p>';


					updateProfile(true);

					console.log(profile);

				}

				// if user is still at home

				else {

					updateProfile(false);
					console.log(profile);

				}
			}

			function error () {
				output.innerHTML = '<p>Please enable Geolocation.</p>';
			}


			navigator.geolocation.watchPosition(success, error);

		}


