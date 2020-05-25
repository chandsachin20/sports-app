const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const registerControllers = require("./controllers/UserController");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.get("/", (req, res) => {
  res.send("Hello from Node.js app \n");
});

app.post('/register', registerControllers.store);

try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("mongo db connected succesflly");
    } catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
