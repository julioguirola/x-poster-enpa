import { client } from "@/lib/db";
import { type WithId } from "mongodb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function () {
  async function getQuotes() {
    await client.connect();
    const db = client.db("xposter");
    const col = db.collection("quotes");
    const quotes = await col.find({}).toArray();
    await client.close();
    return quotes;
  }

  function getRandomItem(array: string[]): string {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const quotes = await getQuotes();
  const frases: string[] = quotes.map((q) => q.text);
  const imgs: string[] = quotes.map((i) => i.url);

  const result = [
    {
      img: getRandomItem(imgs),
      frase: getRandomItem(frases),
    },
    {
      img: getRandomItem(imgs),
      frase: getRandomItem(frases),
    },
    {
      img: getRandomItem(imgs),
      frase: getRandomItem(frases),
    },
    {
      img: getRandomItem(imgs),
      frase: getRandomItem(frases),
    },
    {
      img: getRandomItem(imgs),
      frase: getRandomItem(frases),
    },
  ];

  return (
    <>
      <header className="flex flex-wrap p-5 justify-between items-center">
        <h1 className="dark:text-white text-5xl">X-Poster</h1>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={"/"}>Noticias</Link>
          </Button>
          <Button asChild>
            <Link href={"/efemerides"}>Efemerides</Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-wrap gap-5 justify-center items-center dark:text-white">
        {result.map((f, i) => {
          return (
            <div
              key={i}
              className="dark:text-white p-3 flex flex-col gap-3 w-[300px]"
            >
              <Image src={f.img} alt="" width={250} height={250} />
              <p>{f.frase}</p>
            </div>
          );
        })}
      </main>
    </>
  );
}
