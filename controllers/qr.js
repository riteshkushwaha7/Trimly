const shortid = require('shortid');
const QRCodeLib = require('qrcode');
const URL = require('../models/url');

const generateQRCode = async (req, res) => {
    const { url } = req.body;

    try {
        // Check if the URL already exists
        let existingURL = await URL.findOne({ redirectURL: url });

        if (existingURL) {
            // If the URL exists, generate the QR code for the existing short URL
            const qrCodeImage = await QRCodeLib.toDataURL(`${req.protocol}://${req.get('host')}/${existingURL.shortId}`);
            return res.status(200).send({ id: existingURL.shortId, qrCodeImage });
        }

        // If the URL does not exist, create a new short ID and generate the QR code image
        const shortId = shortid.generate();
        const newURL = new URL({
            shortId,
            redirectURL: url,
            createdBy: req.user ? req.user.username : null
        });

        await newURL.save();
        const qrCodeImage = await QRCodeLib.toDataURL(`${req.protocol}://${req.get('host')}/${shortId}`);
        res.status(201).send({ id: shortId, qrCodeImage });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    generateQRCode
};
