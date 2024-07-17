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
        await sql.close();
    }
    return firstRow;
}

let row = getFirstRow();
let imageURL = row['Image'];

