Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);
    console.log("Not going to actually annoy nonprofits with an email...");

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: 'sam@calblueprint.org',
      from: from,
      subject: subject,
      text: text
    });
  }
});