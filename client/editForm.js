//Listener to show Edit Fields
Template.showForm.events({
  'click #showEdit': function (e,v) {
    Session.set("viewingNpo",false);
    Session.set("query", "");
    Session.set("showingEditForm", true);
    $("#searchWrapper").removeClass('vertalign');
  }
});

//EditForm fields
Template.editForm.editing = function () {
  return Session.get("editing");
}

function getForm(attr, usr){
  var NPO = Nonprofits.findOne({ owner: usr._id });
  if ( NPO == undefined ) {
    return " ";
  } else {
    return NPO[attr];
  }
}

Template.editForm.showingEditForm = function () {
  return Session.get("showingEditForm");
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
  return Nonprofits.findOne(Session.get("viewingNpo")).locations;
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
  'click .edit': function (e,t) {
    if (!Session.get("editing")){
      Session.set("editing", true);
    } else {
      var NPO = Nonprofits.findOne({owner: Meteor.user()._id});
      title = $("#title").val();
      locations = $("#locations").val();
      description = $("#description").val();
      email = $("#email").val();
      keywords = $("#keywords").val().split(/,\s*/);
      if (NPO == undefined) {
        Nonprofits.insert({ title: title, keywords: keywords, locations: locations, description: description, email: email, owner: Meteor.user()._id });
      } else {
        Nonprofits.update({_id: NPO._id}, { $set: { title: title, keywords: keywords, locations: locations, description: description, email: email }});
      }
      Session.set("editing", false); 
    }
  }
});