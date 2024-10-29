const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Books';

// Get all books
app.get('/books', async (req, res) => {
  const params = {
    TableName: TABLE_NAME
  };

  try {
    const data = await dynamodb.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Could not retrieve books' });
  }
});

// Add a new book
app.post('/books', async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: Date.now().toString(), // Using timestamp as a simple unique ID
      title: req.body.title,
      author: req.body.author
    }
  };

  try {
    await dynamodb.put(params).promise();
    res.json(params.Item);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Could not create book' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));