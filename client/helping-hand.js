// Make Nonprofits collection visible
Nonprofits = new Meteor.Collection("nonprofits");

// Set default session values
Session.setDefault("query", "");
Session.setDefault("viewingNpo", false);

// Subscribe to nonprofit list
Meteor.subscribe("nonprofits");

// Listen for typing in search form
Template.searchForm.events({
  'keyup input': function(e, t) {
    var query = t.find('#search').value;
    Session.set("query", query);
    if (!(!query || 0 === query.length))
      $('#searchWrapper').removeClass('vertalign');
    else
      $('#searchWrapper').addClass('vertalign');
  }
});


// Helpers for search
var searchByKeyword = function(keyword) {
  return Nonprofits.find({'keywords': kw}).fetch();
};

var arrayCombiner = function(arr1, arr2) {
  return a1.concat(a2);
};

// Not finding matches right now.
Template.npList.matches = function () {
  var searchTerms = Session.get("query").split(/\s+/);
  return _.reduce(_.map(searchTerms, searchByKeyword),
                  arrayCombiner);
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