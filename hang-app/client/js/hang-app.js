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
	"submit form": function (event, template) {
	    var username = event.target.username.value;
	    var password = event.target.password.value;
	    Meteor.loginWithPassword(username, password, function () {
		this.render('landingPage');
	    });
	}
    });

    Template.signUp.events({
	"submit form": function (event, template) {
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
		    }
		});
	    } else {
		console.log("Password do not match");
	    }
	}
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}

Router.route('/', function () {
    if (Meteor.userId() == undefined){
	this.render('login');
    } else {
	this.render('landingPage');
    }
});

Router.route('/newHangout', function () {
  this.render('newHangout');

Router.route('/signUp', function () {
    this.render('signUp');
});

Router.route('/login', function () {
    this.render('login');
});
