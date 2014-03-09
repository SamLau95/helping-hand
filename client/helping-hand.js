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
  return Nonprofits.find({'keywords': keyword.toLowerCase()}).fetch();
};

var arrayCombiner = function(arr1, arr2) { return arr1.concat(arr2); };

// Search algorithm
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

// Search result listing
Template.npList.events({
  'click .npo': function(e, t) {
    Session.set('viewingNpo', e.currentTarget.id);
  }
});

// Nonprofit viewing template
Template.nonProfitPage.viewingNpo = function() {
  return Session.get("viewingNpo");
};

Session.set("Nedit", false);
Session.set("Ledit", false);
Session.set("Kedit", false);
Session.set("Dedit", false);


Template.nPOName.editName = function () {
  return Session.get("Nedit");
}

Template.locations.editLoc = function () {
  return Session.get("Ledit");
}

Template.keywords.editKey = function () {
  return Session.get("Kedit");
}

Template.description.editDescrip = function () {
  return Session.get("Dedit");
}


Template.nPOName.events({
  'click .nButton': function (e,t) {
    if (!Session.get("Nedit")){
      Session.set("Nedit", true);
    } else {
      var NPO = Nonprofits.findOne(t.data);
      Nonprofits.update({_id: NPO._id}, { $set: { name: $("#name").val()}});
      Session.set("Nedit", false);
    }
  }
});

Template.locations.events({
  'click .lButton': function (e,t) {
    if (!Session.get("Ledit")){
      Session.set("Ledit", true);
    } else {
      var NPO = Nonprofits.findOne(t.data);
      Nonprofits.update({_id: NPO._id}, { $set: {locations: $("#locations").val()}});
      Session.set("Ledit", false);
    }
  }
});

Template.keywords.events({
  'click .kButton': function (e,t) {
    if (!Session.get("Kedit")){
      Session.set("Kedit", true);
    } else {
      var NPO = Nonprofits.findOne(t.data);
      Nonprofits.update({_id: NPO._id}, { $set: {keywords: $("#keywords").val().split(",")}});
      Session.set("Kedit", false);
    }
  }
});

Template.description.events({
  'click .dButton': function (e,t) {
    if (!Session.get("Dedit")){
      Session.set("Dedit", true);
    } else {
      var NPO = Nonprofits.findOne(t.data);
      Nonprofits.update({_id: NPO._id}, { $set: {description: $("#description").val()}});
      Session.set("Dedit", false);
    }
  }
});
