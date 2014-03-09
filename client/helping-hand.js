Nonprofits = new Meteor.Collection('nonprofits');

function isEmpty(str) {
  return (!str || 0 === str.length);
}

if (Meteor.isClient) {
  Session.set("query", "");
  Session.set("emptyQuery", false);
  console.log(Nonprofits.find().fetch());

  Meteor.autosubscribe(function () {
    Meteor.subscribe("nonprofits", Session.get("query"));
  });

  Template.npList.nonProf = function () {
    return Nonprofits.find();
  }

  Template.searchForm.events({
    'keyup input': function(e, t) {
      query = t.find('#search').value;
      Session.set("query", query);
      Session.set("emptyQuery", !isEmpty(query));
      if (!isEmpty(query)){$('#searchWrapper').removeClass('vertalign');} else{$('#searchWrapper').addClass('vertalign');}
    }
  });

  Template.results.hasSearch = function() {
    return Session.get("emptyQuery");
  }
}
