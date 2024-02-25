require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {createPassport} = require('./controller/userController');

// database connection
const connectToDatabase = require('./db/connect');
connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(cookieParser());
// createPassport();
// route connection
const userRouter = require('./routers/userRouter');
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
