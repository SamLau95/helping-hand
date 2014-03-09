
var NonProfits = new Meteor.Collection('nonprofits');

function isEmpty(str) {
  return (!str || 0 === str.length);
}

if (Meteor.isClient) {
  Session.set("query", "");
  Session.set("emptyQuery", true);
  Template.searchForm.events({
    'keyup input': function(e, t) {
      query = t.find('#search').value;
      Session.set("query", query);
      Session.set("emptyQuery", isEmpty(query));
    }
  });

  Template.results.noSearch = function() {
    return Session.get("emptyQuery");
  }
}
