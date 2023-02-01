import { Client } from 'pg';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const client = new Client({
      user: POSTGRES_USER ?? 'admin',
      host: POSTGRES_HOST || 'localhost',
      database: POSTGRES_DB ?? 'team-08-wonderful-game',
      password: POSTGRES_PASSWORD ?? 'baguviX',
      port: Number(POSTGRES_PORT) ?? 5432,
    });

    await client.connect();

    const res = await client.query('SELECT NOW()');
    console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now);
    client.end();

    return client;
  } catch (e) {
    console.error(e);
  }

  return null;
};
