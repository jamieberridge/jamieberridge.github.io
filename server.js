// server.js

const express = require('express');
const sql = require('mssql');

const app = express();

const config = {
    user: 'Jamie',
    password: 'Password1',
    server: 'mealintest1.database.windows.net',
    database: 'Food',
    options: {
        encrypt: true, // Use encryption
    }
};

app.get('/api/getImage', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT TOP 1 Image FROM dbo.Ingredients');
        const imageURL = result.recordset[0].Image;
        res.json({ imageURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await sql.close();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
