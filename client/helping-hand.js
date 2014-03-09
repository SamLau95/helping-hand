Nonprofits = new Meteor.Collection('nonprofits');


if (Meteor.isClient) {

  Session.set("query", "");

  Meteor.autorun(function () {
    Meteor.subscribe("nonprofits", Session.get("query"));
  });

  Template.npList.nonProf = function () {
    return Nonprofits.find();
  }

  Template.searchForm.events({
    'keyup input': function(e, t) {
      query = t.find('#search').value;
      Session.set("query", query);
      if (!(!query || 0 === query.length)){
        $('#searchWrapper').removeClass('vertalign');} 
      else{
        $('#searchWrapper').addClass('vertalign');
      }
    }
  });

  Template.results.hasSearch = function() {
    str = Session.get("query");
    return (!str || 0 === str.length);
  }
}
