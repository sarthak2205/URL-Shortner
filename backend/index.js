const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const app = express();
const cors = require('cors')
const PORT = 8000;
const URL = require('./models/url')

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


app.get(`/:shortId`, async (req, res) => {
    const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate({
            shortId
        }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        });
        entry && res.redirect(entry.redirectURL);
})

app.get('/', async (req, res) => {
    try{
        let data = await URL.find()
        data ? res.status(200).json(data) : res.status(200).json("No data")
    } catch(error) {
        res.status(500).json({error: "Failed to retrieve data"})
    }
})

app.use("/url", urlRoute)

app.listen(PORT, ()=> console.log(`Server Started at port ${PORT}`))