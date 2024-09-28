import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const uri = process.env.DB_STRING ?? "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function () {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth();

  await client.connect();
  const db = client.db("xposter");
  const col = db.collection("events_new");
  const events = await col.find({ dia: dia, mes: mes }).toArray();

  return (
    <main className="flex flex-wrap gap-5 justify-center items-center text-white">
      {JSON.stringify(events)}
    </main>
  );
}
