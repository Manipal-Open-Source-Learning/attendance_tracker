import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DB_NAME = process.env.DB_NAME;

if (!CONNECTION_STRING) {
  throw new Error('CONNECTION_STRING environment variable is not defined');
}

const client = new MongoClient(CONNECTION_STRING);

// Routes
app.get('/', (req, res) => {
  res.status(200).send("API is Up");
});


app.post('/signUp', (req, res) => {
    (async () => {
    try {
        const {
            userEmail
        } = req.body

    const db = client.db(DB_NAME);
    const collection = db.collection("userData");

    const time = new Date().toISOString()

    await collection.insertOne({
        "userEmail": userEmail,
        "signUpTime": time
    });

    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error generating response" });
  }
    })();
});

app.post('/onboard', (req, res) => {
    (async () => {
    try {
        const {
            campus,
            section,
            year,
            userEmail
        } = req.body

    const db = client.db(DB_NAME);
    const collection = db.collection("userData");

    const time = new Date().toISOString()

    await collection.updateOne(
    { "userEmail": userEmail },
    { $set: {"campus": campus,
        "section": section,
        "year": year,
        "userEmail": userEmail,
        "onboardingTime": time
    }}
    );

    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error generating response" });
  }
    })();
});

// Start server
async function startServer() {
  await client.connect();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();