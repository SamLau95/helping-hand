// Make Nonprofits collection visible
Nonprofits = new Meteor.Collection("nonprofits");

// Set default session values
Session.setDefault("query", "");
Session.setDefault("loading", 1.0);
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

// Search algorithm
var searchByKeyword = function(keyword) {
  var re = new RegExp('.*' + keyword + '.*', 'i');
  return Nonprofits.find({$or: [{'keywords': keyword.toLowerCase()},
                                {'title': re },
                                {'location': re}]}).fetch();
};

var arrayCombiner = function(arr1, arr2) { return arr1.concat(arr2); };

var timeLeft = function() {
  
};

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

// Search implementation
Template.npList.matches = function() {
  var searchTerms = Session.get("query").split(/\s+/);
  return _.reduce(_.map(searchTerms, searchByKeyword),
                  arrayCombiner);
}

// Results template
Template.results.searching = function() {
  return !queryIsBlank() && !Session.get("viewingNpo") && !Session.get("showingEditForm");
}

Template.results.loading = function() {
  return Session.get('loading');
};

// Search result listing
Template.npList.events({
  'click .npo': function(e, t) {
    Session.set('viewingNpo', e.currentTarget.id);
  }
});
