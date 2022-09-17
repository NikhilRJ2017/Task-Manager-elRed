require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

// ************************* importing custom packages ***************************//
const connectDB = require('./config/db/connectDB');
const routes = require('./routes/index');
const errorHandler = require('./config/middlewares/error_handler');
const pageNotFoundMiddleware = require('./config/middlewares/page_not_found');


// ************************* importing 3rd party npm packages **************************//
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize')

// ************************* security packages ***************************//
function initiateSecurity() {
    if (process.env.ENVIRONMENT === 'PROD') {
        app.set("trust proxy", 1);
        app.use(cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        }));
       
    } else if (process.env.ENVIRONMENT === 'POSTMAN') {
        app.set("trust proxy", 1);
        app.use(cors());
    }

    app.use(helmet());
    app.use(xss());
    app.use(mongoSanitize())
}

// ************************* body parsing middleware ***************************//
app.use(express.json());

// ************************** cookie parsing middleware ***************************//
app.use(cookieParser(process.env.JWT_SECRET))

// ************************** logger ************************//
app.use(morgan('tiny'));

// ************************** main routes ************************//
app.use('/api/v1', routes)

// ************************** error handler and page not found **************************//
app.use(pageNotFoundMiddleware)
app.use(errorHandler)

// ************************** spinning up the server only when connected to DB************************//
const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_URI);
        initiateSecurity()
        app.listen(PORT, () => {
            console.log(`Server is successfully running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
};
start();