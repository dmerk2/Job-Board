const { S3 } = require("aws-sdk");

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const generatePresignedUrl = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 300,
  };

  return s3.getSignedUrlPromise("putObject", params);
};

module.exports = { generatePresignedUrl };