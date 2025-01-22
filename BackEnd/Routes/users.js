const User = require("../models/User");
const users = express();
const jwt = require('jsonwebtoken');
const tokenChecker = require('../tokenChecker');

users.post('/authentications', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password }).exec()
    if (user) {
        const token = jwt.sign({username: user.username}, SECRET);
        res.json({
            success: true,
            message: 'Authentication success',
            token: token
        });
    } else {
        res.json({ success: false, message: 'Authentication failed' });
    }
} );

