// Make Nonprofits collection visible
Nonprofits = new Meteor.Collection("nonprofits")

// Set default session values
Session.setDefault("query", "");
Session.setDefault("viewingNpo", false);

// Subscribe to nonprofit list
Meteor.subscribe("nonprofits");

// Listen for typing in search form
Template.searchForm.events({
  'keyup input': function(e, t) {
    query = t.find('#search').value;
    Session.set("query", query);
    if (!(!query || 0 === query.length))
      $('#searchWrapper').removeClass('vertalign');
    else
      $('#searchWrapper').addClass('vertalign');
  }
});

// Not finding matches right now.
Template.npList.matches = function () {
  return Nonprofits.find();
}

// Results template
Template.results.searching = function() {
  str = Session.get("query");
  return !(!str || 0 === str.length);
}

Template.results.viewingNpo = function() {
  return Session.get("viewingNpo");
}

// Nonprofit viewing template
Template.nonProfitPage.viewingNpo = function() {
  return Session.get("viewingNpo");
}