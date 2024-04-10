import { Client } from "pg";

async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();
    return await client.query(queryObject);
  } catch (error) {
    console.log("Erro:", error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: process.env.NODE_ENV === "production" ? true : false,
    user: process.env.POSTGRES_USER,
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};
