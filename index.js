require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// database connection
const connectToDatabase = require('./db/connect');
connectToDatabase();

app.use(express.json());


// route connection
const userRouter = require('./routers/userRouter');
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
