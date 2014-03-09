// Publish nonprofits
Meteor.publish("nonprofits", function() {
  Nonprofits.find();
})