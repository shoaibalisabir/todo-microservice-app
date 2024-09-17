require('dotenv').config({ path: '../.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const app = express();
const port = process.env.taskServicePort;

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('todoApp');
    const tasksCollection = db.collection('tasks');

    app.use(cors());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(bodyParser.json());

    app.post('/tasks', async (req, res) => {
      const { userId, name } = req.body;
      if (!userId || !name) {
        return res.status(400).json({ message: 'User ID and task name are required' });
      }
      try {
        const task = { userId, name, completed: false };
        const result = await tasksCollection.insertOne(task);
        res.status(201).json({ id: result.insertedId, ...task });
      } catch (error) {
        console.error('Error inserting task:', error);
        res.status(500).json({ message: 'Error creating task' });
      }
    });

    app.get('/tasks', async (req, res) => {
      const userId = req.query.userId;
      console.log('Hello user'); 
      console.log('Received userId:', userId);
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      try {
        const userTasks = await tasksCollection.find({ userId }).toArray();
        console.log('Tasks found for user:', userTasks);
        res.json(userTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error retrieving tasks' });
      }
    });

    app.put('/tasks/:id', async (req, res) => {
      const taskId = req.params.id;
      const { userId, name, completed } = req.body;
      try {
        const result = await tasksCollection.updateOne(
          { _id: new ObjectId(taskId), userId },
          { $set: { name, completed } }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Task not found or does not belong to this user' });
        }
        res.json(await tasksCollection.findOne({ _id: new ObjectId(taskId) }));
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task' });
      }
    });

    app.delete('/tasks/:id', async (req, res) => {
      const taskId = req.params.id;
      const userId = req.body.userId;
      try {
        const result = await tasksCollection.deleteOne({ _id: new ObjectId(taskId), userId });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Task not found or does not belong to this user' });
        }
        res.status(204).send();
      } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
      }
    });

    app.listen(port, () => {
      console.log(`Task Service is running on http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

main().catch(console.error);
