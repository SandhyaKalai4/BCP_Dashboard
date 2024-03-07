const express = require('express');
const mysql = require('mysql2/promise'); 
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
const port = 3001;

// Replace with your MySQL connection details
const config = {
  host: 'localhost',
  user: 'root',
  password: 'Jroot',
  database: 'BCP_Dashboard' 
};

console.log("Starting server...");

// Create a connection pool
const pool = mysql.createPool(config);

// Define routes here (using the pool object)
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/data', bodyParser.json(), async (req, res) => {
    const dataToInsert = req.body;

    // Define the INSERT query with placeholders
    const insertQuery = `INSERT INTO DataGrid (Id, Name, Amount, tenure) VALUES ?`;

    try {
        const values = dataToInsert.map(item => [item.Id, item.Name, item.Amount, item.tenure]);
4
        // Execute the query using the connection pool
        const [result] = await pool.query(insertQuery, [values]);

        console.log("Data inserted successfully!");
        res.send("Data inserted successfully!");
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data");
    }
});



// Example route to retrieve all data from a table (modify as needed)
app.get('/data', async (req, res) => {
  const selectQuery = `SELECT * FROM DataGrid`;

  try {
    const [rows] = await pool.execute(selectQuery);
    console.log("Data retrieved successfully!");
    res.send(rows); 
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
