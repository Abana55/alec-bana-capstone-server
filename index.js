const express = require('express');
const cors = require('cors');
const app = express();

app.use(express());
app.use(cors());

app.listen(8080, () => {
    console.log('andrea is the fuckin best')
})