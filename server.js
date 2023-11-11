const express = require('express')
const mongoose = require('mongoose');
const PORT = 9090;


const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`server avviato e in ascolto sulla porta ${Port}`))
