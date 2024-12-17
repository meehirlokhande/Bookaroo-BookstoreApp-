const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
require('./connection/conn');
const user = require('./routes/user');
const books  = require('./routes/book');
const favourite = require('./routes/favourite');
const cart = require('./routes/cart');
const Order = require('./routes/order');
app.use(cors());
app.use(express.json());
// routes handeling
app.use("/api/v1",user);
app.use("/api/v1",books);
app.use("/api/v1",favourite);
app.use("/api/v1",cart);
app.use("/api/v1",Order);




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});