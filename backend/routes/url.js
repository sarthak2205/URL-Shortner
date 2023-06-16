const router = require('express').Router();
const shortid = require('shortid');
const URL = require('../models/url')


//create a new shortcode for a url
router.post('/', async (req, res) => {
    const origId = req.body;
    const shortCode = shortid();

    await URL.create({
        shortId: shortCode,
        redirectURL: origId,
        visitHistory: []
    })
    return res.json({ id: shortCode })
})

module.exports = router