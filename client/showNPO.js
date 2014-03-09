// Nonprofit viewing template
Template.nonProfitPage.viewingNpo = function() {
  return Session.get("viewingNpo");
};

Template.nonProfitPage.events({
  'click #backToResults': function() {
    Session.set('viewingNpo', false);
  }
});

Template.contactForm.events({
  'click #sendEmail': function(e, t) {
    Meteor.call('sendEmail',
      Nonprofits.findOne(Session.get("viewingNpo")).email,
      $("#emailFrom")[0].value,
      $("#emailName")[0].value + " - " + $("#emailSubject")[0].value,
      $("#emailContent")[0].value);
  }
});
