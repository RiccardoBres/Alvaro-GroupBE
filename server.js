const express = require('express')
const mongoose = require('mongoose');
const PORT = 9090;
const cors = require('cors')

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;



const EventsRoute = require('./Routes/EventsRoute');
const UserRoute = require('./Routes/UserRoute');
const LoginRoute = require('./Routes/LoginRoute');
const MerchRoute = require('./Routes/MerchRoute');

app.use('/', EventsRoute);
app.use('/', UserRoute);
app.use('/', LoginRoute);
app.use('/', MerchRoute);

db.on("error", console.error.bind("errore connessione al server"));
db.once("open", () => { console.log("database mongodb connesso") }
);
app.listen(PORT, () =>
    console.log(`server avviato e in ascolto sulla porta ${PORT}`)
);
