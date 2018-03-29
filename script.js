// Hypothetical backend where user information is stored, 
// For sake of challenge, backend will exist as global variables

// var home = {
// 	longitude: -79.384293,
// 	latitude: 43.653908
// };

var home;

		// Establish user home coordinates

		function findHome() {


			function success (position) {

				// hypothetical push of user's home coordinates to backend

				home = position.coords;

			console.log(home.longitude);
			console.log(home.latitude);
			}

			function error () {
				console.log('error');
			}

			navigator.geolocation.getCurrentPosition(success, error);

		}

		// Establish user's current location and measure distance to home location

		function checkDoor () {

			function success (position) {

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

				var distanceHomeToCurrent = distanceInMetersBetweenEarthCoordinates(home.latitude, home.longitude, location.latitude, location.longitude);

				// if distance between user location and home location is greater than 200 meters

				if (distanceHomeToCurrent > 200) {
					console.log('did you lock your door?')
				}

				// if user is still at home
				
				else {

					console.log('youre still at home, dum dum');
				}
			}

			function error () {
				console.log('error');
			}


			navigator.geolocation.watchPosition(success, error);
		}
