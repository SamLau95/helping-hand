# Make Nonprofits collection visible
# Global for now only.
Nonprofits = new Meteor.Collection("nonprofits")

# Set default session values
Session.setDefault "query", ""
Session.setDefault "viewingNpo", false

# Subscribe to nonprofit list
Meteor.autorun ->
  Meteor.subscribe "nonprofits", Session.get("query")


# Listen for typing in search form
Template.searchForm.events "keyup input": (e, t) ->
  query = t.find("#search").value
  Session.set "query", query
  unless not query or 0 is query.length
    $("#searchWrapper").removeClass "vertalign"
  else
    $("#searchWrapper").addClass "vertalign"


# Not finding matches right now.
Template.npList.matches = ->
  Nonprofits.find()


# Results template
Template.results.searching = ->
  str = Session.get("query")
  not str or 0 is str.length

Template.results.viewingNpo = ->
  Session.get "viewingNpo"


# Nonprofit viewing template
Template.nonProfitPage.viewingNpo = ->
  Session.get "viewingNpo"