const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    title: { type: String },
    body: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number, default: 0 }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post; 