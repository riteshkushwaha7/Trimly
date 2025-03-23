const jwt = require('jsonwebtoken');
const User = require('../models/users');

const redirectIfAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            return next();
        }

        req.user = user;
        return res.redirect('/');
    } catch (error) {
        next();
    }
};

module.exports = redirectIfAuthenticated;
