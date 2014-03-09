var query = "";
var NonProfits = new Meteor.Collection('nonprofits');

if (Meteor.isClient) {
  Template.searchForm.events({
    'keypress input': function(e, t) {
      query = t.find('#search').value;
    }
  });
}
