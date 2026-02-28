const express = require("express");
const multer = require("multer")
const app = express();
const connectDB = require("./middleware/DB");
const userRouter = require('./routes/userRouters')
const productRouter = require('./routes/productRouters')
const sellerRouter = require('./routes/sellerRoutes')
const categoryRouter = require('./routes/categoryRouters')
const multerRouter = require('./routes/multerRouters');
const cartRouter = require('./routes/cartRouters')
const orderRouter = require('./routes/orderRouters')
const reviewRouter = require('./routes/reviewRouters')
const cors = require('cors')

let PORT = 3000;
//used so that it alloes communication between 2 ports (used for integrating backend)
app.use(cors());
//to convert the payload from string to object
app.use(express.json());
//connecting mongoDB
connectDB()

app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/seller',sellerRouter)
app.use('/category', categoryRouter)
app.use('/multer', multerRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/review',reviewRouter)

app.listen(PORT, () => {
  console.log(`server strated at 3000`);
});
