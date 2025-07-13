import dotenv from 'dotenv';
import path from 'path';
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config({
    path: path.resolve(
        process.cwd(),
        process.env.NODE_ENV === 'production'
            ? '.env.production'
            : '.env.development'
    ),
});

const app = express();
const PORT = process.env.PORT || 5000;

// MONGO DB CONNECTION

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// MIDDLEWARE WE GONNA ADD 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTERS

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'WE COOKING BABY!!!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// WE MIGHT ADD/REMOVE ANY OF THE FOLDERS DEPENDING ON HOW THIS TURNS UP