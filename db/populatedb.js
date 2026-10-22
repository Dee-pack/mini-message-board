require("dotenv").config();
const { Client } = require("pg");

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    text VARCHAR(500) NOT NULL,
    added TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

async function main() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    try {
        await client.query(CREATE_TABLE);

        const { rows } = await client.query("SELECT COUNT(*) FROM messages");
        if (Number(rows[0].count) === 0) {
            await client.query(
                `INSERT INTO messages (username, text) VALUES ($1, $2), ($3, $4)`,
                ["Amando", "Hi there!", "Charles", "Hello World!"]
            );
            console.log("Table created and seeded.");
        } else {
            console.log("Table already has data, skipping seed.");
        }
    } finally {
        await client.end();
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});