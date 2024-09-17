require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.userServicePort;

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('todoApp');
    const usersCollection = db.collection('users');

    app.use(cors());
    app.use(bodyParser.json());

    app.post('/register', async (req, res) => {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      const userExists = await usersCollection.findOne({ username });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = { username, password };
      await usersCollection.insertOne(newUser);
      res.status(201).json(newUser);
    });

    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      const user = await usersCollection.findOne({ username, password });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
      res.json({ message: 'Login successful', user });
    });

    app.listen(port, () => {
      console.log(`User Service is running on http://localhost:${port}`);
    });

  } catch (err) {
    console.error(err);
  }
}

main().catch(console.error);
