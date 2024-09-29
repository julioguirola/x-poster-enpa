"use server";
import { TwitterApi, TwitterApiReadWrite, TwitterApiv2 } from "twitter-api-v2";

async function createBufferFromImageUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error creating buffer from image URL:", error);
    return null;
  }
}

export default async function tweet(text1, text2, img) {
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
        await twitterClient.v1.uploadMedia(
          await createBufferFromImageUrl(
            "https://x-poster-enpa.vercel.app" + img,
          ),
        ),
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
