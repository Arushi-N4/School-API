require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

(async () => {
    try {
        const conn = await pool.getConnection();
        console.log("✅ Database connected!");
        conn.release();
    } catch (err) {
        console.error("❌ DB connection failed:", err.message);
    }
})();

module.exports = pool;
