const client = require('../../koneksiClient.js');
const express = require("express");
const port = 3003;
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

client.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ' + error);
  }
});

app.get('/queryDatabaseUser', (req, res) => {
  client.query('SELECT * FROM "user"', (err, result) => { // Use double quotes around "user"
    if (err) {
      console.error('Error querying the database', err);
      res.status(500).json({ error: 'Error querying the database' });
    } else {
      res.json(result.rows);
    }
  });
});

app.post('/insertUser', (req, res) => {
  const { nama_pembeli, token_user } = req.body;

  const query = {
    text: 'INSERT INTO "user" (nama_pembeli, token_user) VALUES ($1, $2)',  // Use double quotes around "user"
    values: [nama_pembeli, token_user],
  };

  client.query(query, (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      console.log('Data inserted successfully');
      res.status(201).json({ message: 'Data berhasil ditambahkan' });
    }
  });
});

app.put('/editUser/:id', (req, res) => {
  const { nama_pembeli, token_user } = req.body;
  const id_pembeli = req.params.id;

  const query = {
    text: 'UPDATE "user" SET nama_pembeli = $1, token_user = $2 WHERE id_pembeli = $3', 
    values: [nama_pembeli, token_user, id_pembeli],
  };

  client.query(query, (err) => {
    if (err) {
      console.error('Error editing data', err);
      res.status(500).json({ error: 'Error editing data' });
    } else {
      res.json({ message: 'Data berhasil diubah' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
