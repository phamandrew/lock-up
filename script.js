// Hypothetical backend where user information is stored, 
// For sake of challenge, backend will exist as global variables


// var home;

var profile = {
	home: {},

};



		function getProfile() {
			return profile;
		}

		function updateProfileHome(long, lat) {
			profile.home.longitude = long;
			profile.home.latitude = lat;
		};

		function updateProfile(kaaw) {
			if (kaaw > 200) {
					// console.log('did you lock your door?')

					profile.leftHome = true;

					console.log(profile);
				}

				// if user is still at home

				else {

					// console.log('youre still at home, dum dum');
					profile.leftHome = false;
					console.log(profile);
				}
		};



		// Establish user home coordinates

		function findHome() {


			function success (position) {

				// console.log(position.coords.longitude);
				// console.log(position.coords.latitude);

				// hypothetical push of user's home coordinates to backend

				updateProfileHome(position.coords.longitude, position.coords.latitude);

				console.log(profile.home.longitude);
				console.log(profile.home.latitude);

				// profile.home.longitude = position.coords.longitude;
				// profile.home.latitude = position.coords.latitude;

				// profile.home = position.coords;

			// console.log(profile.home.longitude);
			// console.log(profile.home.latitude);
			}

			function error () {
				console.log('error');
			}

			navigator.geolocation.getCurrentPosition(success, error);

		}

		// Establish user's current location and measure distance to home location

		function checkDoor () {

			function success (position) {

				getProfile();

				var location = position.coords;

				// console.log(location.longitude);
				// console.log(location.latitude);


				//  conversion of degrees to radians

				function degreesToRadians(degrees) {
					return degrees * Math.PI / 180;
				}

				// calculation of distance in meters between home and current coordinates

				function distanceInMetersBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
					var earthRadiusKm = 6371;

					var dLat = degreesToRadians(lat2-lat1);
					var dLon = degreesToRadians(lon2-lon1);

					lat1 = degreesToRadians(lat1);
					lat2 = degreesToRadians(lat2);

					var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					return (earthRadiusKm * c) * 1000;
				}

				var distanceHomeToCurrent = distanceInMetersBetweenEarthCoordinates(profile.home.latitude, profile.home.longitude, location.latitude, location.longitude);

				// if distance between user location and home location is greater than 200 meters

				updateProfile(distanceHomeToCurrent);

				// if (distanceHomeToCurrent > 200) {
				// 	// console.log('did you lock your door?')

				// 	profile.leftHome = true;

				// 	console.log(profile);
				// }

				// // if user is still at home

				// else {

				// 	// console.log('youre still at home, dum dum');
				// 	profile.leftHome = false;
				// 	console.log(profile);
				// }
			}

			function error () {
				console.log('error');
			}


			navigator.geolocation.watchPosition(success, error);

		}


