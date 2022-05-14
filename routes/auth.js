const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        res.status(200).json({msg: 'User has been created!', user})
    } catch (e) {
        res.status(500).json(e);
    }
});

// Login 
router.post('/login', async (req, res) => {
    try {  
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return await res.status(400).json('Wrong')
        }

        const validate = await bcrypt.compare(req.body.password, user.password)
        if (!validate) {
            return await res.status(400).json('Wrong')
        }

       res.status(200).json(user)
    } catch(e) {
        await res.json(400).json({error: 'Server error', e})
    }
});


module.exports = router;