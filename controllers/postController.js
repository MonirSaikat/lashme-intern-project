const { validationResult } = require('express-validator');
const { Schema: { Types : { ObjectId }} } = require('mongoose');
const Post = require('../models/Post');

module.exports = {
    getAll: async(req, res, next) => {
        try {
            const posts = await Post.find().populate('author');
            res.json({ success: true, posts }); 
        } catch (error) {
            next(error);
        }
    }, 
    
    getSingle: async(req, res, next) => {
        try {
            const { id } = req.params;
            const post = await Post.findById(ObjectId.set(id));
            if(!post) throw new Error('No post with this id');
            return res.json({ success: true, post }); 
        } catch (error) {
            next(error); 
        }
    },

    create: async(req, res, next) => {
        try {
            const errors = validationResult(req);
            const { title, body } = req.body;

            if(!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() }); 
                return;
            }

            const post = new Post({
                title, 
                body, 
                author: req.user._id 
            });
            await post.save();

            res.json({ success: true, post });
        } catch (error) {
            next(error);           
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const post = await Post.findByIdAndUpdate(ObjectId.set(id), req.body);
            if(!id) throw new Error('No post with this id'); 
            res.json({ success: true, post }); 
        } catch (error) {
            next(error); 
        }
    },

    delete: async(req, res, next) => {
        try {
            const { id } = req.params;
            const post = await Post.findById(ObjectId.set(id));
            if(!post) throw new Error('No post found with the id');

            if(post.author !== req.user._id) throw new Error('You can\'t delete this post'); 

            await post.delete();
            res.json({ success: true, message: 'Post deleted' }); 
        } catch (error) {
            next(error); 
        }
    }
}