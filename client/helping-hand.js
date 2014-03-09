Nonprofits = new Meteor.Collection('nonprofits');

function isEmpty(str) {
  return (!str || 0 === str.length);
}

if (Meteor.isClient) {
  Session.set("query", "");
  Session.set("emptyQuery", true);
  console.log(Nonprofits.find().fetch());

  Template.searchForm.events({
    'keyup input': function(e, t) {
      query = t.find('#search').value;
      Session.set("query", query);
      Session.set("emptyQuery", isEmpty(query));
      if (!isEmpty(query)){$('#searchWrapper').removeClass('vertalign');} else{$('#searchWrapper').addClass('vertalign');}
    }
  });

  var pagevariable = true; // change this variable later to make page enter functionality

  Template.results.noSearch = function() {
    return Session.get("emptyQuery");
  }
  Template.results.onPage = function() {
    return pagevariable//
  }

  Template.nonProfitPage.onPage = function() {
    return pagevariable //change this later
  }
}
