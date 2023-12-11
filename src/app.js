require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const products = require("./routes/productRouter");

const notFountMiddleware = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/products", products);

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