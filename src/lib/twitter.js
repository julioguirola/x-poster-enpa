"use server";

import { TwitterApi, TwitterApiReadWrite, TwitterApiv2 } from "twitter-api-v2";
import { readdir } from "fs/promises";
import { join as pathJoin } from "path";

const getFidelPath = () => {
  return pathJoin(process.cwd(), "public/fidel");
};

const touched = { current: false };

const touchFidelPath = () => {
  if (touched.current) return; // only need to do once
  readdir(getFidelPath()); // fire and forget
  touched.current = true;
};

export default async function tweet(text1, text2, img) {
  touchFidelPath();
  console.log(process.cwd());

  const client = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
  });

  const twitterClient = client.readWrite;

  try {
    if (img) {
      const mediaID = await Promise.all([
        await twitterClient.v1.uploadMedia("./public" + img),
      ]);

      await client.v2.tweet({
        text: text1 + "\n#LatirAvileño #LatirXUn26Avileño",
        media: { media_ids: mediaID },
      });
    } else {
      await client.v2.tweet({
        text: `${text1}\n${text2}\n#LatirAvileño #LatirXUn26Avileño`,
      });
    }
  } catch (e) {
    console.log(e);
    return {
      message: "Error",
    };
  }
  return {
    message: "Publicado",
  };
}
