const express = require('express')
require('dotenv').config();
const pool = require('./db');

const schoolRoutes = require('./routes/schools');

const app = express();
app.use(express.json());

app.use('/', schoolRoutes)

const PORT = parseInt(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});