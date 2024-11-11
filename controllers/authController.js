const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
console.log("JWT_SECRET in authController:", JWT_SECRET);

exports.signup = async (req, res) => {
    const { name, email, cin, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render('signup', { error: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('signup', { error: 'User with that email already exists' });
        }

        const hashedPassword = await argon2.hash(password);

        const newUser = new User({
            name,
            email,
            cin,
            password: hashedPassword,
        });

        await newUser.save();

        res.redirect('/login');
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.render('signup', { error: `An error occurred during registration: ${error.message}` });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7h' });

        res.cookie('token', token, { httpOnly: true });

        res.redirect('/user/profile');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { error: 'An error occurred during login' });
    }
};
