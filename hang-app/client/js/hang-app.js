if (Meteor.isClient) {
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
