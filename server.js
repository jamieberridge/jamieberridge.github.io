// server.js

const express = require('express');
const sql = require('mssql');

const app = express();

// Configuration for connecting to SQL Server
const config = {
    user: 'Jamie',
    password: 'Password1',
    server: 'mealintest1.database.windows.net',
    database: 'Food',
    options: {
        encrypt: true, // Use encryption
        enableArithAbort: true // Required for SQL Server connections
    }
};

// Define a GET endpoint to retrieve image URL
app.get('/api/getImage', async (req, res) => {
    try {
        // Connect to SQL Server
        await sql.connect(config);

        // Query to get the first image URL from Ingredients table
        const result = await sql.query('SELECT TOP 1 Image FROM dbo.Ingredients');

        // Close SQL connection
        await sql.close();

        // Extract image URL from SQL result
        const imageURL = result.recordset[0].Image;

        // Respond with JSON containing imageURL
        res.json({ imageURL });
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
