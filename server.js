const { configDotenv } = require("dotenv");
const express = require("express");
const connectDB = require("./middleware/DB");

//controller
const userController = require('./controllers/userController')

configDotenv()

const app = express();
let PORT = 3000;
let PORT1 = 3001;

//to convert the payload from string to object
app.use(express.json());
//connecting mongoDB
connectDB()



app.get("/", (req, res) => {
  res.send(`hello bhopal`);
});

app.get("/home", (req, res) => {
  res.send(`hello bhopal ,i am home`);
});

app.get("/about", (req, res) => {
  res.send(`hello about page`);
});

//brings A Payload as well with request 
//using controller 
app.post("/register", userController.register);

app.listen(PORT, () => {
  console.log(`server strated at 3000`);
});

app.listen(PORT1, () => {
  console.log(`server strated at 3001`);
});
