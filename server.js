const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors'); 
const PORT = 9090;

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
const PaymentsRoute = require('./Routes/PaymentsRoute');
const CustomerRoute = require('./Routes/CustomersRoute');
const MailingListRoute = require('./Routes/MailingListRoute');

app.use('/', EventsRoute);
app.use('/', UserRoute);
app.use('/', LoginRoute);
app.use('/', MerchRoute);
app.use('/', PaymentsRoute);
app.use('/', CustomerRoute);
app.use('/', MailingListRoute)


db.on("error", console.error.bind("errore connessione al server"));
db.once("open", () => { console.log("database mongodb connesso") }
);
app.listen(PORT, () =>
    console.log(`server avviato e in ascolto sulla porta ${PORT}`)
);
