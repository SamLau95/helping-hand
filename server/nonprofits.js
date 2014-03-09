// Seed data
var Nonprofits = new Meteor.Collection('nonprofits');

Meteor.startup(function() {
  if (Nonprofits.find().count() == 0) {
    Userseeds = [{ username: 'sam',
                   email: 'sam@calblueprint.org',
                   password: 'qwerty' }]
    userIds = _.map(Userseeds, function(seed) { Accounts.createUser(seed) });
    for (var i = 0; i < 20; i++) {
      userIds.push(
        Accounts.createUser({
          username: 'User ' + i,
          email: 'user' + i + '@npo.org',
          password: 'qwerty'}));
    }
    NPOseeds = [{ title: 'Common Change',
                  keywords: ['funding'],
                  locations: "Oakland",
                  description: "LOREM IPSUM",
                  email: "valerie@commonchange.com" ,
                  owner: userIds[0] },
                { title: 'Partners in School Innovation',
                  keywords: ['education', 'literacy'],
                  locations: "Oakland",
                  description: "LOREM IPSUM",
                  email: 'calexandre@partnersinschools.org',
                  owner: userIds[1] },
                { title: 'IISME',
                  keywords: ['stem', 'education', 'teachers'],
                  locations: "Oakland",
                  description: "LOREM IPSUM",
                  email: 'swatkins@iisme.org' ,
                  owner: userIds[2] },
                { title: 'The Lawrence Hall of Science',
                  keywords: ['education', 'research', 'stem'],
                  locations: 'Berkeley',
                  description: 'LOREM IPSUM',
                  email: 'rdorph@berkeley.edu',
                  owner: userIds[3] },
                { title: 'The Stride Center',
                  keywords: ['lowincome', 'employment', 'job'],
                  locations: 'Oakland',
                  description: 'LOREM IPSUM',
                  email: 'jess@stridecenter.org',
                  owner: userIds[4] },
                { title: 'Centro Legal de La Raza',
                  keywords: ['legal', 'lowincome', 'youth', 'law'],
                  locations: 'Berkeley',
                  description: 'LOREM IPSUM',
                  email: 'juanvera@centrolegal.org',
                  owner: userIds[5] },
                { title: 'Support Oakland Artists',
                  keywords: ['art', 'artists', 'oakland'],
                  locations: 'Oakland',
                  description: 'LOREM IPSUM',
                  email: 'randolph@supportoaklandartists.org',
                  owner: userIds[6] },
                { title: 'College Track',
                  keywords: ['education', 'lowincome'],
                  locations: 'Oakland',
                  description: 'LOREM IPSUM',
                  email: 'slin@collegetrack.org',
                  owner: userIds[7] },
                { title: 'Foundation for Sustainable Development',
                  keywords: ['sustainability', 'community', 'environment'],
                  locations: 'Oakland',
                  description: 'LOREM IPSUM',
                  email: 'Diego@fsdinternational.org',
                  owner: userIds[8] },
                { title: 'Roots of Success',
                  keywords: ['education', 'lowincome', 'environment'],
                  locations: 'Berkeley',
                  description: 'LOREM IPSUM',
                  email: 'shamar@rootsofsuccess.org',
                  owner: userIds[9] } ];
    _.map(NPOseeds, function(seed) { Nonprofits.insert(seed) })
  }
});

// Publish nonprofits
Meteor.publish("nonprofits", function() {
  return Nonprofits.find();
});