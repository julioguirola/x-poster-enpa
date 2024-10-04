import { client } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PublishButton from "@/components/PublishButton";
export const dynamic = "force-dynamic";
export default async function () {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth();

  await client.connect();
  const db = client.db("xposter");
  const col = db.collection("events_new");
  const events = await col.find({ dia: dia, mes: mes }).toArray();

  return (
    <>
      <header className="flex flex-wrap p-5 justify-between items-center">
        <h1 className="dark:text-white text-5xl">X-Poster</h1>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={"/"}>Noticias</Link>
          </Button>
          <Button asChild>
            <Link href={"/frases"}>Frases</Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-wrap gap-5 justify-center items-center dark:text-white">
        {events.map((e, i) => {
          return (
            <div
              key={i}
              className="dark:text-white p-3 flex flex-col gap-3 w-[300px]"
            >
              <p>{e.fecha}</p>
              <p>{String(e.text).slice(0, 300) + " ..."}</p>
              <PublishButton
                text1={e.fecha}
                text2={e.text.slice(0, 175) + " https://bnjm.cu/fechario"}
                img=""
              />
            </div>
          );
        })}
      </main>
    </>
  );
}
