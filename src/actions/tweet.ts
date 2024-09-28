import tweet from "@/lib/twitter";

export async function tweetear(initialState: any, formData: any) {
  const { text1, text2, img } = {
    text1: formData.get("text1"),
    text2: formData.get("text2"),
    img: formData.get("img"),
  };

  const resp = await tweet(text1, text2, img);
  return resp;
}
