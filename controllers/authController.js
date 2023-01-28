const User = require('../models/User'); 
const { getToken } = require('../utils/jwt');
const { validationResult } = require('express-validator'); 

module.exports = {
    register: async (req, res, next) => {
        try {
            const errors = validationResult(req); 
            console.log(errors.array())
            const { name, username, password } = req.body;

            if(!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
                return;
            }

            const user = new User({
                name, 
                username,
                password
            });

            await user.save();
            const token = await getToken(user.toObject());
            
            res.json({ success: true, user, token });
        } catch (error) {
            next(error); 
        }
    },

    login: async(req, res, next) => {
        console.log('hit');
        try {
            const errors = validationResult(req);
            const { username, password } = req.body;
            console.log(errors.array());

            if(!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
                return;
            }

            const user = await User.findOne({ username });
            if(!user) throw new Error('No user found with this username');
            
            const passwordMatched = await user.comparePassword(password);
            if(!passwordMatched) throw new Error('Password did not matched');

            const token = await getToken(user.toObject());
            res.json({ success: true, user, token }); 
        } catch (error) {
            console.log(error); 
            next(error); 
        }
    }
}