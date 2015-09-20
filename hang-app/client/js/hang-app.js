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
  this.render('landingPage');
    } else {
  this.render('login');
    }
});

Router.route('/newHangout', function () {
  this.render('newHangout');
});
