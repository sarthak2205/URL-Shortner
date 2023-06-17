const router = require('express').Router();
const shortid = require('shortid');
const URL = require('../models/url')


//create a new shortcode for a url
router.post('/', async (req, res) => {
    const origId = req.body;
    const shortCode = shortid();
    if(!origId) res.json({error: "URL is required"})
    await URL.create({
        shortId: shortCode,
        redirectURL: origId.url,
        visitHistory: []
    })
    return res.json({ id: shortCode })
})


//To get analytics of a specific URL
router.get('/analytics/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
})

module.exports = router