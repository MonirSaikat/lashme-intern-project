const jwt = require('jsonwebtoken');

module.exports = {
    authenticated: async (req, res, next) => {
        if(req.header('Authorization')) {
            const token = req.header('Authorization')?.replace('Bearer ', ''); 

            if(token) {
                const decoded = await jwt.verify(token, process.env.JWT_TOKEN);
                req.user = decoded;
                return next();
            }
        }

        res.status(403).json({ message: 'Unauthorized' }); 
    },

    getToken: async (object) => {
        try {
            const options = { expiresIn: '7d' };
            const token = await jwt.sign(object, process.env.JWT_TOKEN, options);
            return token;
        } catch (error) {
            throw error; 
        }
    }
};