Nonprofits = new Meteor.Collection("nonprofits")
Meteor.startup ->
  if Nonprofits.find().count() is 0
    Nonprofits.insert
      name: "Common Change"
      keywords: ["funding"]

    Nonprofits.insert
      name: "Partners in School Innovation"
      keywords: [
        "education"
        "literacy"
      ]

    Nonprofits.insert
      name: "IISME"
      keywords: [
        "STEM"
        "education"
        "teachers"
      ]

  return

Meteor.publish "nonprofits", (tag) ->
  Nonprofits.find keywords:
    $elemMatch: tag

