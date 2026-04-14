const express = require("express");
const dotenv = require("dotenv");

// to access the .env file variables.
dotenv.config();
const app = express();

// client can send json data to the server.
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running on this port, ${PORT}`);
});