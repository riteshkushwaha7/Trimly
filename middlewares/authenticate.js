const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Correct path to the User model

async function authenticate(req, res, next) {
    const token = req.cookies.auth_token;

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        req.user = null;
        next();
    }
}

module.exports = {
    authenticate,
};
