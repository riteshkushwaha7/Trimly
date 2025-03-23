require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { generateURL } = require('./controllers/url');
const { generateQRCode } = require('./controllers/qr');
const User = require('./models/users'); 
const { authenticate } = require('./middlewares/authenticate'); 
const redirectIfAuthenticated = require('./middlewares/redirectIfAuthenticated'); 
const URL = require('./models/url');
const PORT = process.env.PORT || 3000;
const { connectDB } = require("./routes/connect");

const app = express();
connectDB(process.env.URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", authenticate, async (req, res) => {
    let urls = [];
    if (req.user) {
        urls = await URL.find({ createdBy: req.user.username });
    }
    res.render("index", { user: req.user, urls });
});

app.get("/login", redirectIfAuthenticated, (req, res) => {
    res.render("login");
});

app.get("/signup", redirectIfAuthenticated, (req, res) => {
    res.render("signup");
});

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.cookie('auth_token', token, { httpOnly: true });
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.cookie('auth_token', token, { httpOnly: true });
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/logout', authenticate, async (req, res) => {
    try {
        res.clearCookie('auth_token');
        res.send({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/shorten', authenticate, generateURL);
app.post('/generate-qrcode', authenticate, generateQRCode);

app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;

    const urlDoc = await URL.findOne({ shortId });

    if (urlDoc) {
        res.redirect(urlDoc.redirectURL);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT, () => {
    console.log(`App is Listening on PORT: ${PORT}`);
});
