Hangouts = new Mongo.Collection("hangouts");
var geocoder;

if (Meteor.isClient) {
    Template.landingPage.helpers({
      hangouts: function(){
        return Hangouts.find({});
      }
    });

    Template.landingPage.events({
      "click .new-hangout-btn": function (event) {
        event.preventDefault();

        Router.go('/newHangout');
      }
    });

    Template.newHangout.events({
      "submit .new-hangout": function (event) {
        // Prevent default browser form submit
        event.preventDefault();
   
        // Get value from form element
        var text = event.target.text.value;
        var time = event.target.time.value;
        var location = event.target.location.value;
        var cap = event.target.cap.value;
        var minflop = event.target.minflop.value;
   
        // Insert a task into the collection
        Hangouts.insert({
          text: text,
          time: time,
          location: location,
          cap: cap,
          minflop: minflop,
          createdAt: new Date() // current time
        });
        Router.go('/');
        // Clear form
        event.target.text.value = "";
      }
    });


    Template.foo.helpers({
        templateGestures: {
            'swipeleft ul li': function(event, templateInstance) {
                /* `event` is the Hammer.js event object */
                /* `templateInstance` is the `Blaze.TemplateInstance` */
                /* `this` is the data context of the element in your template, so in this case `someField` from `someArray` in the template */
            }
        }
    });

    Template.login.events({
	"submit #login-form": function (event, template) {
	    event.preventDefault();
	    var username = event.target.username.value;
	    var password = event.target.password.value;
	    Meteor.loginWithPassword(username, password, function (error) {
		if (error) {
		    console.log("Login Error");
		} else {
		    console.log("sucess")
		    Router.go('/');
		}
	    });
	}
    });

    Template.signUp.events({
	"submit #sign-up-form": function (event, template) {
	    event.preventDefault();
	    var username = event.target.username.value;
	    var password = event.target.password.value;
	    var password2 = event.target.password.value;

	    if (password == password2) {
		Accounts.createUser({
		    username: username,
		    password: password
		}, function (error) {
		    if (error) {
			console.log("Error creating user");
		    } else {
			Router.go('/');
		    }
		});
	    } else {
		console.log("Passwords do not match");
	    }
	}
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}

Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
  this.render('login');
    } else {
  this.next();
    }
}, { except: ['signUp']
});

Router.route('/', function () {
  // if (Meteor.userId() == undefined){
    this.render('landingPage');
    var self = this;
    var loc = Geolocation.latLng();
    httpGetAsync ('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc.lat + ',' + loc.lng, function(res){
      self.render('landingPage', {
        data: {
          locationString: JSON.parse(res).results[0].formatted_address
        }
      });
    });
    // geocoder = new google.maps.Geocoder();
    // codeLatLng(loc.lat, loc.lng, function (city, country){
    //   self.render('landingPage', {
    //     data: {
    //       locationString: city + " " + country
    //     }
    //   });
    // });
    // navigator.geolocation.getCurrentPosition(function (position){ 
      
    // });
    
  // } else {
    // this.render('login');
  // }
});

Router.route('/newHangout', function () {
  this.render('newHangout');
});

// function codeLatLng(lat, lng, callback) {

//   var latlng = new google.maps.LatLng(lat, lng);
//   geocoder.geocode({'latLng': latlng}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       console.log(results)
//       if (results[1]) {
//        //formatted address
//        // alert(results[0].formatted_address)
//       //find country name
//         for (var i=0; i<results[0].address_components.length; i++) {
//           for (var b=0;b<results[0].address_components[i].types.length;b++) {
//           //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
//               if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
//                   //this is the object you are looking for
//                   city= results[0].address_components[i];
//                   break;
//               }
//           }
//       }

//       callback(city.short_name, city.long_name);
//       } else {
//         alert("No results found");
//       }
//     } else {
//       alert("Geocoder failed due to: " + status);
//     }
//   });
// }

Router.route('/signUp', function () {
    this.render('signUp');
});

Router.route('/login', function () {
    this.render('login');
});

Router.route('/logout', function () {
    Meteor.logout(function (error) {
	if (error) {
	    console.log("Error logging out");
	} else {
	    Router.go('/');
	}
    })
});

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}