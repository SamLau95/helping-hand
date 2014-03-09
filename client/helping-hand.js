// Make Nonprofits collection visible
Nonprofits = new Meteor.Collection("nonprofits");

// Set default session values
Session.setDefault("query", "");
Session.setDefault("viewingNpo", false);

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
      $('#searchWrapper').removeClass('vertalign');
    else {
      $('#searchWrapper').addClass('vertalign');
      Session.set('viewingNpo', false);
    }
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
  return !queryIsBlank() && !Session.get("viewingNpo");
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

Template.nonProfitPage.events({
  'click #backToResults': function() {
    Session.set('viewingNpo', false);
  }
});

Session.set("Tedit", false);
Session.set("Ledit", false);
Session.set("Kedit", false);
Session.set("Dedit", false);


Template.nPOTitle.editTitle = function () {
  return Session.get("Tedit");
}

Template.nPOTitle.title = function () {
  var NPO = Nonprofits.findOne(this);
  return NPO.title;
}

Template.locations.editLoc = function () {
  return Session.get("Ledit");
}

Template.locations.locations = function () {
  var NPO = Nonprofits.findOne(this);
  return NPO.location;
}

Template.keywords.editKey = function () {
  return Session.get("Kedit");
}

Template.keywords.keywords = function () {
  var NPO = Nonprofits.findOne(this);
  return NPO.keywords;
}

Template.description.editDescrip = function () {
  return Session.get("Dedit");
}

Template.description.description = function () {
  var NPO = Nonprofits.findOne(this);
  return NPO.description;
}

Template.nPOTitle.events({
  'click .tButton': function (e,t) {
    if (!Session.get("Tedit")){
      Session.set("Tedit", true);
    } else {
      var NPO = Nonprofits.findOne(t.data);
      Nonprofits.update({_id: NPO._id}, { $set: { title: $("#title").val()}});
      Session.set("Tedit", false);
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
      Nonprofits.update({_id: NPO._id},
                        { $set: {keywords: $("#keywords").val().split(/,\s+/)}});
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

Template.contactForm.events({
  'click #sendEmail': function(e, t) {
    Meteor.call('sendEmail',
      Nonprofits.findOne(Session.get("viewingNpo")).email,
      $('#emailFrom')[0].value,
      $('#emailName')[0].value + " - " + $('#emailSubject')[0].value,
      $('#emailContent')[0].value);
  }
});