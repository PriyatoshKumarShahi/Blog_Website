const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());




const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

 app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
}






app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
