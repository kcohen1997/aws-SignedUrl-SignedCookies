//SERVER SIDE CODE
const AWS = require("aws-sdk");

//Import and configure aws s3 connection
const cloudfrontAccessKeyId = process.env.NEXT_PUBLIC_CF_ACCESS_KEY_ID;
const cloudFrontPrivateKey = process.env.NEXT_PUBLIC_CF_PRIVATE_KEY;
const signer = new AWS.CloudFront.Signer(
  cloudfrontAccessKeyId,
  cloudFrontPrivateKey
);

// 2 days as milliseconds to use for link expiration
const twoDays = 2 * 24 * 60 * 60 * 1000;
// var options = { keypairId: "K30MMTIZNMEVPZ", privateKeyString: privateKey };

export default function handler(req, res) {
  try {
    let { url } = req.body;

    // sign a CloudFront URL that expires 2 days from now
    const signedUrl = signer.getSignedUrl({
      url,
      expires: Math.floor((Date.now() + twoDays) / 1000), // Unix UTC timestamp for now + 2 days
    });

    res.status(200).json({ success: true, signedUrl });
  } catch (e) {
    console.log("ERROR ", e);
    res
      .status(200)
      .json({ message: "You are not authorized to access this file." });
  }
}
