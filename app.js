const express = require("express");
const routes = require("./routes/routes");
const connectDB = require("./config/dbConfig");

require("dotenv").config();

connectDB();

const app = express();
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
