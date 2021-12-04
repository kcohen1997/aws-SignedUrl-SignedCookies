import React, { useState } from "react";
import { useEffect } from "react";
import ReactHlsPlayer from "react-hls-player";
import Cookies from "js-cookie";
import Grid from "@mui/material/Grid";

export default function HlsPlayer() {
  const axios = require("axios").default;

  const [signedUrlMp4, setSignedUrlMp4] = useState("");
  const [signedUrlHLS, setSignedUrlHLS] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    // Make request to serverside code, you can include reference to what file you want to access if applicable

    // SIGNED COOKIES FOR ALL FILES
    let response = await axios.post("/api/signedCookies", {
      url: `${process.env.NEXT_PUBLIC_CLOUDFRONT_LINK}/mov_bbb.mp4`,
    });
    let data = response.data;

    // SIGNED URL FOR MP4 FILE
    response = await axios.post("/api/signedUrl", {
      url: `${process.env.NEXT_PUBLIC_CLOUDFRONT_LINK}/mov_bbb.mp4`,
    });
    data = response.data;
    setSignedUrlMp4(data.signedUrl);

    // SIGNED URL FOR HLS FILE
    response = await axios.post("/api/signedUrl", {
      url: "https://d3nnxy7d703otu.cloudfront.net/convertedFiles/mov_bbb.m3u8",
    });
    data = response.data;
    setSignedUrlHLS(data.signedUrl);

    setIsLoading(false);
  }, []);

  return (
    !isLoading && (
      <div style={{ padding: 20 }}>
        <div>
          <p>
            {" "}
            <b> MP4 File </b>{" "}
          </p>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <p> Original Link (Shouldn't Work) </p>
              <video controls style={{ width: "100%" }}>
                <source
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_LINK}/mov_bbb.mp4`}
                  type="video/mp4"
                />
              </video>
            </Grid>
            <Grid item xs={12} sm={3}>
              <p> Signed Cookie </p>
              <video controls style={{ width: "100%" }}>
                <source
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_LINK}/mov_bbb.mp4`}
                  type="video/mp4"
                />
              </video>
            </Grid>

            <Grid item xs={12} sm={3}>
              <div>
                <p> Signed URL </p>

                <video controls style={{ width: "100%" }}>
                  <source src={signedUrlMp4} type="video/mp4" />
                </video>
              </div>
            </Grid>
          </Grid>
        </div>

        <div>
          <p>
            {" "}
            <b> HLS Player </b>{" "}
          </p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <p> Signed Cookie </p>

              <ReactHlsPlayer
                src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_LINK}/convertedFiles/mov_bbb.m3u8`}
                autoPlay={false}
                controls={true}
                width="100%"
                // height="500"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <div>
                <p> Signed URL </p>
                <ReactHlsPlayer
                  src={signedUrlHLS}
                  autoPlay={false}
                  controls={true}
                  width="100%"
                  // width="500"
                  // height="500"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  );
}
