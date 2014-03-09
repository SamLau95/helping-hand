// Make Nonprofits collection visible
Nonprofits = new Meteor.Collection("nonprofits");

// Set default session values
Session.setDefault("query", "");
Session.setDefault("viewingNpo", false);
Session.setDefault("editing", false);
Session.setDefault("showingEditForm", false)
// Subscribe to nonprofit list
Meteor.subscribe("nonprofits");

// Helper for checking blank query
var queryIsBlank = function() {
  var query = Session.get("query");
  return !query || 0 === query.length;
};

// Helpers for search
var searchByKeyword = function(keyword) {
  return Nonprofits.find({'keywords': keyword.toLowerCase()}).fetch();
};

var arrayCombiner = function(arr1, arr2) { return arr1.concat(arr2); };

// Listen for typing in search form
Template.searchForm.events({
  'keyup input': function(e, t) {
    var query = t.find('#search').value;
    Session.set("query", query);
    if (!queryIsBlank())
      $("#searchWrapper").removeClass('vertalign');
    else {
      $("#searchWrapper").addClass('vertalign');
    }
    Session.set("viewingNpo", false);
    Session.set("showingEditForm", false);
  }
});

// Search algorithm
Template.npList.matches = function () {
  var searchTerms = Session.get("query").split(/\s+/);
  return _.reduce(_.map(searchTerms, searchByKeyword),
                  arrayCombiner);
}

// Results template
Template.results.searching = function() {
  return !queryIsBlank() && !Session.get("viewingNpo") && !Session.get("showingEditForm");
}

// Search result listing
Template.npList.events({
  'click .npo': function(e, t) {
    Session.set('viewingNpo', e.currentTarget.id);
  }
});
