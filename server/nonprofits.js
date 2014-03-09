// Seed data
Nonprofits = new Meteor.Collection('nonprofits');

Meteor.startup(function() {
  if (Nonprofits.find().count() == 0) {
    Nonprofits.insert({ name: 'Common Change', keywords: ['funding'], location: "Oakland", description: "LOREM IPSUM" });
    Nonprofits.insert({ name: 'Partners in School Innovation',
                        keywords: ['education', 'literacy'], location: "Oakland", description: "LOREM IPSUM"});
    Nonprofits.insert({ name: 'IISME',
                        keywords: ['stem', 'education', 'teachers'], location: "Oakland", description: "LOREM IPSUM" });
  }
});

// Publish nonprofits
Meteor.publish("nonprofits", function() {
  return Nonprofits.find();
});