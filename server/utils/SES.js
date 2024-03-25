const AWS = require("aws-sdk");

let accessKeyId, secretAccessKey;

if (process.env.NODE_ENV === "production") {
  accessKeyId = process.env.AWS_PRODUCTION_ACCESS_KEY_ID;
  secretAccessKey = process.env.AWS_PRODUCTION_SECRET_ACCESS_KEY;
} else {
  accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
}

const ses = new AWS.SES({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: process.env.AWS_REGION,
});

const sendEmail = async (to, from, subject, body) => {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: from,
  };

  await ses.sendEmail(params).promise();
};

module.exports = { sendEmail };
