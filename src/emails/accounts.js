const sgMail = require("@sendgrid/mail");
const sendgripAPI =
  "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";

sgMail.setApiKey(sendgripAPI);

sgMail.send({
  to: "smitbhalodiya.ict19@gmail.com",
  from: "kabirsinh2113@gmail.com",
  subject: "my first project",
  text: "I hope it's work well",
});
