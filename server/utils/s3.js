const AWS = require("aws-sdk");

let accessKeyId, secretAccessKey;

if (process.env.NODE_ENV === "production") {
  accessKeyId = process.env.AWS_PRODUCTION_ACCESS_KEY_ID;
  secretAccessKey = process.env.AWS_PRODUCTION_SECRET_ACCESS_KEY;
} else {
  accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
}

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: process.env.AWS_REGION,
});

const uploadImage = async (key, file, mimetype) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: mimetype,
  };

  await s3.upload(params).promise();

  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
};

module.exports = { uploadImage };
