import { parse } from "node-html-parser";

export async function scrap(url: string, selector: string) {
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      },
    });
    const text = await resp.text();
    const root = parse(text);
    const result = root.querySelectorAll(selector);

    const docsresult = result.map((elm) => {
      const obj = {
        text: elm.querySelector("a")?.innerText,
        url: elm.querySelector("a")?.getAttribute("href"),
      };
      return obj;
    });
    return docsresult;
  } catch (e: any) {
    console.log(e.message);
    return;
  }
}
