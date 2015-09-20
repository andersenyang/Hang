Hangouts = new Mongo.Collection("hangouts");

if (Meteor.isClient) {
    Template.landingPage.helpers({
      hangouts: function(){
        return Hangouts.find({});
      }
    });

    Template.landingPage.events({
      "click .new-hangout-btn": function (event) {
        // Prevent default browser form submit
        event.preventDefault();
   
        // Get value from form element
        // var text = event.target.text.value;
   
        // // Insert a task into the collection
        // Hangouts.insert({
        //   text: text,
        //   createdAt: new Date() // current time
        // });
        Router.go('/newHangout');
        // Clear form
        // event.target.text.value = "";
      }
    });

    Template.newHangout.events({
      "submit .new-hangout": function (event) {
        // Prevent default browser form submit
        event.preventDefault();
   
        // Get value from form element
        var text = event.target.text.value;
   
        // Insert a task into the collection
        Hangouts.insert({
          text: text,
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
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}

Router.route('/', function () {
  if (Meteor.userId() == undefined){
    var self = this;
    navigator.geolocation.getCurrentPosition(function (position){ 
      codeLatLng(position.coords.latitude, position.coords.longitude, function (city, country){
        self.render('landingPage', {
          data: {
            locationString: city + " " + country
          }
        });
      });
    });
    
  } else {
    this.render('login');
  }
});

Router.route('/newHangout', function () {
  this.render('newHangout');
});

function codeLatLng(lat, lng, callback) {

  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
      if (results[1]) {
       //formatted address
       // alert(results[0].formatted_address)
      //find country name
        for (var i=0; i<results[0].address_components.length; i++) {
          for (var b=0;b<results[0].address_components[i].types.length;b++) {
          //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
              if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                  //this is the object you are looking for
                  city= results[0].address_components[i];
                  break;
              }
          }
      }

      callback(city.short_name, city.long_name);
      } else {
        alert("No results found");
      }
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });
}