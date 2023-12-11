require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require('./db/connect');

const notFountMiddleware = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.send("Store API");
})

app.use(notFountMiddleware);
app.use(errorHandlerMiddleware);

const port = Number(process.env.PORT);

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`server is listening in port ${port} ...`);
        });
    } catch (error) {
        console.log(error);
    }
}

start().then(r => {})