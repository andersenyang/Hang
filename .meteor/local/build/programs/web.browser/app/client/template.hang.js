(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw("<h1>Hang</h1>\n  <div>(Our description here...)</div>\n\n  "), Spacebars.include(view.lookupTemplate("hello")) ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("hello");
Template["hello"] = new Template("Template.hello", (function() {
  var view = this;
  return HTML.Raw("<button>Hang in Boston</button>\n  <p>login</p>");
}));

})();
