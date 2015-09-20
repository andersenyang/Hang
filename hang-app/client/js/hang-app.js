Hangouts = new Mongo.Collection("hangouts");
Hangers = new Mongo.Collection("hangers");

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
      },
      "click #landing-icon": function (event) {
        event.preventDefault();

        Router.go('/landingPage');
      },
      "click #myhangouts-icon": function (event) {
        event.preventDefault();

        Router.go('/myhangoutsPage');
      },
      "click #hangouts-icon": function (event) {
        event.preventDefault();

        Router.go('/hangoutsPage');
      },
      "click #settings-icon": function (event) {
        event.preventDefault();

        Router.go('/settingsPage');
      },
      "click .interrested": function (event){
        Meteor.userId
      }
    });

    Template.myhangoutsPage.events({
      "click .new-hangout-btn": function (event) {
        event.preventDefault();

        Router.go('/newHangout');
      },
      "click #landing-icon": function (event) {
        event.preventDefault();

        Router.go('/landingPage');
      },
      "click #myhangouts-icon": function (event) {
        event.preventDefault();

        Router.go('/myhangoutsPage');
      },
      "click #hangouts-icon": function (event) {
        event.preventDefault();

        Router.go('/hangoutsPage');
      },
      "click #settings-icon": function (event) {
        event.preventDefault();

        Router.go('/settingsPage');
      }
    });

    Template.hangoutsPage.events({
      "click .new-hangout-btn": function (event) {
        event.preventDefault();

        Router.go('/newHangout');
      },
      "click #landing-icon": function (event) {
        event.preventDefault();

        Router.go('/landingPage');
      },
      "click #myhangouts-icon": function (event) {
        event.preventDefault();

        Router.go('/myhangoutsPage');
      },
      "click #hangouts-icon": function (event) {
        event.preventDefault();

        Router.go('/hangoutsPage');
      },
      "click #settings-icon": function (event) {
        event.preventDefault();

        Router.go('/settingsPage');
      }
    });

    Template.settingsPage.events({
      "click .new-hangout-btn": function (event) {
        event.preventDefault();

        Router.go('/newHangout');
      },
      "click #landing-icon": function (event) {
        event.preventDefault();

        Router.go('/landingPage');
      },
      "click #myhangouts-icon": function (event) {
        event.preventDefault();

        Router.go('/myhangoutsPage');
      },
      "click #hangouts-icon": function (event) {
        event.preventDefault();

        Router.go('/hangoutsPage');
      },
      "click #settings-icon": function (event) {
        event.preventDefault();

        Router.go('/settingsPage');
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

    Meteor.setInterval(function() {
      loc = Geolocation.latLng();
    //   // var str = httpGet ('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc.lat + ',' + loc.lng);

      if (!loc){
        return;
      }

      httpGetAsync ('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc.lat + ',' + loc.lng, function(res){
        Session.set('locationString', JSON.parse(res).results[0].formatted_address);
      });
        Session.set('lat', Geolocation.latLng().lat);
        Session.set('lon', Geolocation.latLng().lng);
        
    }, 500);

    Template.landingPage.helpers({
      lat: function() { return Session.get('lat'); },
      lon: function() { return Session.get('lon'); },
      locationString: function () { return Session.get('locationString')}
    });

    Template.hangoutsPage.helpers({
      hangouts: function () { return (Hangers.find({this.Meteor.userId()})).interrestedHangouts};  
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
		    console.log("sucess");
        Hangers.insert({
          id: Meteor.userId(),
          time: Date.now(),
          location: 0,
          floprate : 0,
          createdAt: new Date(), // current time
          myHangouts : [],
          interrestedHangouts : []
        });
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
    this.render('landingPage');
});

Router.route('/newHangout', function () {
  this.render('newHangout');
});

Router.route('/signUp', function () {
    this.render('signUp');
});

Router.route('/login', function () {
    this.render('login');
});

Router.route('/myhangoutsPage', function () {
    this.render('myhangoutsPage');
});

Router.route('/settingsPage', function () {
    this.render('settingsPage');
});

Router.route('/hangoutsPage', function () {
    this.render('hangoutsPage');
});

Router.route('/landingPage', function () {
    this.render('landingPage');
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

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

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

