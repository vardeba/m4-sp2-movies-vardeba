import { Client } from "pg";

export const client: Client = new Client({
    user: "varde",
    password: "1234",
    host: "localhost",
    database: "sprint_2",
    port: 5432,
});

export const startDatabase = async (): Promise<void> => {
    await client.connect();
    console.log("Database connected!");
};
