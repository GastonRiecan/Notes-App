import dotenv from 'dotenv';

dotenv.config();

const ENVIROMENT = {
    FRONTEND_URL: process.env.FRONT_URL,
    DB_URL: process.env.MONGODB_URI
}

export default ENVIROMENT