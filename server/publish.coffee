# Publish nonprofits
Meteor.publish "nonprofits", (tag) ->
  Nonprofits.find keywords:
    $elemMatch: tag
