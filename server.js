const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express()

const receiptRoute = require('./src/routes/receiptRoutes');
const returnRoute = require('./src/routes/returnRoutes');
const userRoute = require('./src/routes/userRoutes');

const sequelize = require('./src/configs/sequelize/connection');

app.use(express.json({limit: "1gb", extended: true}))
app.use(express.urlencoded({limit: "1gb", extended: true, parameterLimit: 50000}))
dotenv.config();

const PORT = process.env.PORT | 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'))
//MySql connection
require('./src/configs/sequelize/connection');


sequelize
    .authenticate()
    .then(() => console.log('Connection to database has been established successfully.'))
    .catch((err) => console.error(err));

app.use('/receipt', receiptRoute);
app.use('/return', returnRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});
