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
      $("#searchWrapper").removeClass('vertalign');
    else {
      $("#searchWrapper").addClass('vertalign');
      Session.set("viewingNpo", false);
      Session.set("editForm", false);
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
  return !queryIsBlank() && !Session.get("viewingNpo") && !Session.get("editForm");
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

Session.set("editing", false);

Template.editForm.editing = function () {
  return Session.get("editing");
}

function getForm(attr, usr){
  var NPO = Nonprofits.findOne({ user_id: usr._id})
  if ( NPO == undefined){
    return "The" + attr + "of your organization goes here!";
  } else {
    return NPO.call(attr);
  }
}

Template.editForm.title = function () {
  return getForm("title", Meteor.user());
}

Template.editForm.locations = function () {
  return getForm("locations", Meteor.user());
}

Template.editForm.keywords = function () {
  return getForm("keywords", Meteor.user());
}

Template.editForm.description = function () {
  return getForm("description", Meteor.user());
}

Template.editForm.email = function () {
  return getForm("email", Meteor.user());
}

Template.listNPO.title = function () {
  return Nonprofits.findOne(Session.get("viewingNpo")).title;
}

Template.listNPO.locations = function () {
  return Nonprofits.findOne(Session.get("viewingNpo")).location;
}

Template.listNPO.description = function () {
  return Nonprofits.findOne(Session.get("viewingNpo")).description;
}
Template.listNPO.keywords = function () {
  return Nonprofits.findOne(Session.get("viewingNpo")).keywords;
}
Template.listNPO.email = function () {
  return Nonprofits.findOne(Session.get("viewingNpo")).email;
}



Template.editForm.events({
  'click .tButton': function (e,t) {
    if (!Session.get("editing")){
      Session.set("editing", true);
    } else {
      var NPO = Nonprofits.findOne({user_id: currentUser._id});
      if (NPO == 'undefined') {
        title = $("#title").val();
        location: $("#locations").val();
        description = $("#description").val();
        email = $("#email").val();
        keywords = $("keywords").val().split(/,\s+/);
        Nonprofits.insert({ title: title, keywords: keywords, location: location, description: description, email: email, current_id: currentUser._id });
        Session.set("editing", false); 
      } else {
        Nonprofits.update({_id: NPO._id}, { $set: { title: title, keywords: keywords, location: location, description: description, email: email }});
        Session.set("editing", false); 
      }
    }
  }
});

Template.contactForm.events({
  'click #sendEmail': function(e, t) {
    Meteor.call('sendEmail',
      Nonprofits.findOne(Session.get("viewingNpo")).email,
      $("#emailFrom")[0].value,
      $("#emailName")[0].value + " - " + $("#emailSubject")[0].value,
      $("#emailContent")[0].value);
  }
});

