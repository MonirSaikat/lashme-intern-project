const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs'); 

const UserSchema = new Schema({
    name: String,
    username: {
        type: String, 
    },
    password: { type: String, select: false },
    followers: [{ type:  Schema.Types.ObjectId, ref: 'User'}],
    following: [{ type:  Schema.Types.ObjectId, ref: 'User'}],
}, { timestamps: true });

UserSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt); 
        user.password = hash;
        next(); 
    } catch (error) {
        return next(error);         
    }
});

UserSchema.methods.comparePassword = async function(password){
    try {
        const matched = await bcrypt.compare(password, this.password);
        return matched;
    } catch (error) {
        throw error.message;
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = User; 