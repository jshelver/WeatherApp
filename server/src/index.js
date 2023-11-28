import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// Load .env file
dotenv.config({ path: '../.env'});

// Express app setup
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// Import routes
import Routes from './routes/api/Routes';
app.use('/api', Routes);

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server is listening on port ${process.env.BACKEND_PORT}`);
});