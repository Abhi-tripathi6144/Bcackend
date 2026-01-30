const express = require("express");
const app = express();
const connectDB = require("./middleware/DB");
const userRouter = require('./routes/userRouters')

let PORT = 3000;

//to convert the payload from string to object
app.use(express.json());
//connecting mongoDB
connectDB()

app.use('/user',userRouter)


app.listen(PORT, () => {
  console.log(`server strated at 3000`);
});
