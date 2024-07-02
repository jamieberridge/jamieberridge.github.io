const sql = require('mssql');

const config = {
    user: 'Jamie',
    password: 'Password1',
    server: 'mealintest1.database.windows.net',
    database: 'Food',
    options: {
        encrypt: true, // Use encryption
    }
};

async function getFirstRow() {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT TOP 1 * FROM dbo.Ingredients');
        const firstRow = result.recordset[0];
        console.log(firstRow['Image']);
    } catch (error) {
        console.error(error);
    } finally {
        sql.close();
    }
    return firstRow;
}

let row = getFirstRow();
let image = row['Image'];

// Function to convert Base64 string back to an image and display it
function base64ToImage(base64String, imageElementId) {
    const imgElement = document.getElementById(imageElementId);
    imgElement.src = base64String; 
}

// Example usage
base64ToImage(image, "yourImageElementId");  // Replace with your actual image element ID
