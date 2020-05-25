const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 8000;

app.use(cors());

app.get('/', (req, res) =>{
    res.send("Hello from express");
})
    
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})