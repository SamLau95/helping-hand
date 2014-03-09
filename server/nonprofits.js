// Seed data
Nonprofits = new Meteor.Collection('nonprofits');

Meteor.startup(function() {
  if (Nonprofits.find().count() == 0) {
    seeds = [{ title: 'Common Change',
               keywords: ['funding'],
               location: "Oakland",
               description: "LOREM IPSUM",
               email: "valerie@commonchange.com" },
             { title: 'Partners in School Innovation',
               keywords: ['education', 'literacy'],
               location: "Oakland",
               description: "LOREM IPSUM",
               email: 'calexandre@partnersinschools.org'},
             { title: 'IISME',
               keywords: ['stem', 'education', 'teachers'],
               location: "Oakland",
               description: "LOREM IPSUM",
               email: 'swatkins@iisme.org' },
             { title: 'The Lawrence Hall of Science',
               keywords: ['education', 'research', 'stem'],
               location: 'Berkeley',
               description: 'LOREM IPSUM',
               email: 'rdorph@berkeley.edu'},
             { title: 'The Stride Center',
               keywords: ['lowincome', 'employment', 'job'],
               location: 'Oakland',
               description: 'LOREM IPSUM',
               email: 'jess@stridecenter.org'},
             { title: 'Centro Legal de La Raza',
               keywords: ['legal', 'lowincome', 'youth', 'law'],
               location: 'Berkeley',
               description: 'LOREM IPSUM',
               email: 'juanvera@centrolegal.org'},
             { title: 'Support Oakland Artists',
               keywords: ['art', 'artists', 'oakland'],
               location: 'Oakland',
               description: 'LOREM IPSUM',
               email: 'randolph@supportoaklandartists.org'}]

    _.map(seeds, function(seed) { Nonprofits.insert(seed) })
  }
});

// Publish nonprofits
Meteor.publish("nonprofits", function() {
  return Nonprofits.find();
});