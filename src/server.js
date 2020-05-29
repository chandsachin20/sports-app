const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes');
const path = require("path")
const cors = require("cors");
const app = express();

const userController = require("./controllers/UserController");

const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
 

try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("mongo db connected succesflly");
    } catch (error) {
  console.log(error);
}


app.use('/files', express.static(path.resolve(__dirname,"..","..","files")));
app.use(routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
