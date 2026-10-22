const pool = require("./pool");

// "user" alias keeps your existing EJS views working (message.user)
const SELECT_FIELDS = `id, username AS "user", text, added`;

async function getAllMessages() {
    const { rows } = await pool.query(
        `SELECT ${SELECT_FIELDS} FROM messages ORDER BY added DESC`
    );
    return rows;
}

async function getMessageById(id) {
    const { rows } = await pool.query(
        `SELECT ${SELECT_FIELDS} FROM messages WHERE id = $1`,
        [id]
    );
    return rows[0];
}

async function insertMessage(username, text) {
    await pool.query(
        "INSERT INTO messages (username, text) VALUES ($1, $2)",
        [username, text]
    );
}

module.exports = { getAllMessages, getMessageById, insertMessage };