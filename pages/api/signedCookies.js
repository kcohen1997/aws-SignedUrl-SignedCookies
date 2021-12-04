//SERVER SIDE CODE
const AWS = require("aws-sdk");
var cf = require("aws-cloudfront-sign");
import { serialize } from "cookie";

//Import and configure aws s3 connection
const cloudfrontAccessKeyId = process.env.NEXT_PUBLIC_CF_ACCESS_KEY_ID;
const cloudFrontPrivateKey = process.env.NEXT_PUBLIC_CF_PRIVATE_KEY;
const signer = new AWS.CloudFront.Signer(
  cloudfrontAccessKeyId,
  cloudFrontPrivateKey
);

var options = {
  keypairId: cloudfrontAccessKeyId,
  privateKeyString: cloudFrontPrivateKey,
};

// 2 days as milliseconds to use for link expiration
const twoDays = 2 * 24 * 60 * 60 * 1000;
// var options = { keypairId: "K30MMTIZNMEVPZ", privateKeyString: privateKey };

export default function handler(req, res) {
  try {
    let { url } = req.body;

    var signedCookies = cf.getSignedCookies(url, options);
    // var signedCookies = cf.getSignedCookies('http://xxxxxxx.cloudfront.net/*', options);

    res.setHeader("Set-Cookie", [
      serialize(
        "CloudFront-Policy",
        signedCookies["CloudFront-Policy"],
        {
          path: "/",
        },
        { domain: ".example.com" }
      ),
      serialize("CloudFront-Signature", signedCookies["CloudFront-Signature"], {
        path: "/",
        // domain: ".example.com"
      }),
      serialize(
        "CloudFront-Key-Pair-Id",
        signedCookies["CloudFront-Key-Pair-Id"],
        {
          path: "/",
          // domain: ".example.com"
        }
      ),
    ]);

    res.status(200).json({ success: true, signedCookies });
  } catch (e) {
    console.log("ERROR ", e);
    res
      .status(200)
      .json({ message: "You are not authorized to access this file." });
  }
}
