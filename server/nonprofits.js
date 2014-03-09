Nonprofits = new Meteor.Collection('nonprofits');

Meteor.startup(function() {
  if (Nonprofits.find().count() == 0) {
    Nonprofits.insert({ name: 'Common Change', keywords: ['funding'] });
    Nonprofits.insert({ name: 'Partners in School Innovation',
                        keywords: ['education', 'literacy']});
    Nonprofits.insert({ name: 'IISME',
                        keywords: ['STEM', 'education', 'teachers'] });
  }
});

Meteor.publish("nonprofits", function (tag) {
  return Nonprofits.find( { keywords: { $elemMatch: tag }});
})