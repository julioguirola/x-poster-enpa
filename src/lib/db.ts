import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const uri = process.env.DB_STRING ?? "";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
