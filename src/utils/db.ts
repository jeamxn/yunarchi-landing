import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedClient: any = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri, options);
  cachedClient = client;

  return client;
}