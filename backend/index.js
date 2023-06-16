const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const app = express();
const cors = require('cors')
const PORT = 8000;

const urlRoute = require('./routes/url')

app.use(cors({
    origin: "http://localhost:3000"
}))

dotenv.config()

//connecting MongoDB
mongoose.connect(process.env.CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(console.log("MongoDB is Connected!!"))
.catch((err)=>console.log(err))

//middleware to parse incoming bodies
app.use(express.json())


app.use("/url", urlRoute)

app.listen(PORT, ()=> console.log(`Server Started at port ${PORT}`))