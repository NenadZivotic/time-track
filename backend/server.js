const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/times", require("./routes/api/times"));

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
