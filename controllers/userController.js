const argon2 = require('argon2');
const User = require('../models/user');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('profile', { user, success: null,error: null });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.render('profile', { user: null, error: 'Error fetching profile' });
    }
};


exports.updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        return res.render('profile', { user: req.user, error: 'User not authenticated' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.render('profile', { user: req.user, error: 'User not found' });
        }

        const isMatch = await argon2.verify(user.password, oldPassword);
        if (!isMatch) {
            return res.render('profile', { user, error: 'Old password is incorrect' });
        }

        if (newPassword !== confirmPassword) {
            return res.render('profile', { user, error: 'New passwords do not match' });
        }

        user.password = await argon2.hash(newPassword);
        await user.save();

        res.render('profile', { user, success: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.render('profile', { user: req.user, error: 'Error updating password' });
    }
};