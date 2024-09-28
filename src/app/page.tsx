import { Button } from "@/components/ui/button";
import Link from "next/link";
import Efemerides from "@/components/Efemerides";
import { scrap } from "@/lib/scrapper";

export default async function Home() {
  const cubadebateNews = await scrap(
    "http://www.cubadebate.cu",
    "#front-list > div > .title",
  );
  const tvCav = await scrap("https://www.tvavila.icrt.cu/", "article h4");

  return (
    <>
      <header className="flex flex-wrap p-5 justify-between items-center">
        <h1 className="dark:text-white text-5xl">X-Poster</h1>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={"/frases"}>Frases</Link>
          </Button>
          <Button asChild>
            <Link href={"/efemerides"}>Efemerides</Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-wrap gap-5 justify-center items-center">
        {cubadebateNews &&
          tvCav &&
          [...cubadebateNews, ...tvCav].map((n, i) => {
            return (
              <div
                key={i}
                className="dark:text-white p-3 flex flex-col gap-3 w-[300px]"
              >
                <p>{n.text}</p>
                <p>{n.url}</p>
              </div>
            );
          })}
      </main>
    </>
  );
}
