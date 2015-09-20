if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.hello.helpers({
        counter: function() {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function() {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });

    Template.landingPage.helpers({});

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
        'click #facebook-login': function(event) {
            Meteor.loginWithFacebook({}, function(err) {
                if (err) {
                    throw new Meteor.Error("Facebook login failed");
                }
            });
        },

        'click #logout': function(event) {
            Meteor.logout(function(err) {
                if (err) {
                    throw new Meteor.Error("Logout failed");
                }
            })
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}
