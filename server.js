const express = require("express");
const multer = require("multer")
const app = express();
const connectDB = require("./middleware/DB");
const userRouter = require('./routes/userRouters')
const productRouter = require('./routes/productRouters')
const sellerRouter = require('./routes/sellerRoutes')
const categoryRouter = require('./routes/categoryRouters')
const multerRouter = require('./routes/multerRouters');

let PORT = 3000;

//to convert the payload from string to object
app.use(express.json());
//connecting mongoDB
connectDB()

app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/seller',sellerRouter)
app.use('/category', categoryRouter)
app.use('/multer', multerRouter)


app.listen(PORT, () => {
  console.log(`server strated at 3000`);
});
