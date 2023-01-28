const User = require('../models/User');
const { validationResult } = require('express-validator');
const { getToken } = require('../utils/jwt');
const { Schema: { Types: { ObjectId } } } = require('mongoose');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const errors = validationResult(req); 
            const { name, username, password} = req.body;

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

    getUserByUserName: async (req, res, next) => { 
        try {
            const { username } = req.params;
            const user = await User.findOne({ username });
            if(!user) throw new Error('No user with this username'); 
            res.json({ success: true, user });
        } catch (error) {
            next(error);
        }
    },

    getFollowersByUserName: async (req, res, next) => {
        try {
            const { username } = req.params;
            const user = await User.findOne({ username }).populate('followers');

            if(!user) throw new Error('No user with this username'); 

            const followers = user.followers || [];
            res.json({ success: true, followers }); 
        } catch (error) {
            next(error); 
        }
    },

    getFollowingsByUserName: async(req, res, next) => {
        try {
            const { username } = req.params;
            const user = await User.findOne({ username }).populate('following');

            if(!user) throw new Error('No user with this username'); 

            const following = user.following || [];
            res.json({ success: true, following }); 
        } catch (error) {
            next(error); 
        }
    },

    follow: async (req, res, next) => {
        try {
            const { username } = req.params;
            
            const followedUser = await User.findOne({ username });
            if(!followedUser) throw new Error('No user with this username'); 
            followedUser.followers.push(req.user._id); 
            await followedUser.save();

            const followerUser = await User.findById(ObjectId.set(req.user._id));
            followerUser.following.push(followedUser._id);
            await followerUser.save();

            res.json({ success: true, message: `You have started following ${followedUser.name}` }); 
        } catch (error) {
            next(error); 
        }
    },

    unfollow: async (req, res, next) => {
        try {
            const { username } = req.params;
            
            const unfollowedUser = await User.findOne({ username });
            if(!unfollowedUser) throw new Error('No user with this username'); 
            unfollowedUser.followers.pop(req.user._id); 
            await unfollowedUser.save();

            const unfollowerUser = await User.findById(req.user._id);
            unfollowerUser.following.pop(unfollowedUser._id);
            await unfollowerUser.save();

            res.json({ success: true, message: `You have unfollowed ${followedUser.name}` }); 
        } catch (error) {
            next(error); 
        }
    },
};
