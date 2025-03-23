const shortid = require('shortid');
const URL = require('../models/url');

const generateURL = async (req, res) => {
    const { url } = req.body;

    try {
        // Check if the URL already exists
        let existingURL = await URL.findOne({ redirectURL: url });

        if (existingURL) {
            // If the URL exists and was created by the same user, return the existing short ID
            if (existingURL.createdBy === req.user.username) {
                return res.status(200).send({ id: existingURL.shortId });
            } else {
                // If the URL exists but was created by another user, add the new user to the URL's users array
                existingURL.users.push(req.user.username);
                await existingURL.save();
                return res.status(200).send({ id: existingURL.shortId });
            }
        }

        // If the URL does not exist, create a new short ID
        const shortId = shortid.generate();
        const newURL = new URL({
            shortId,
            redirectURL: url,
            createdBy: req.user.username,
            users: [req.user.username]
        });

        await newURL.save();
        res.status(201).send({ id: shortId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    generateURL
};
