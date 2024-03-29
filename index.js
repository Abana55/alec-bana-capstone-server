require("dotenv").config();
const express = require('express');
const cors = require("cors");
const calculators = require("./routes/calculators")
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express());
app.use(cors());
app.use(express.json());
//routes
// app.use("/api/users")
app.use("/api/calculators", calculators)

app.listen(8080, () => {
    console.log('Testing')
})