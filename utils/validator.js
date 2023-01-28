const { body } = require('express-validator');

module.exports = {
    loginRouteValidate: () => {
        return [
            body('username', 'Username is reuiqred').exists(),
            body('password', 'Password is required').exists()
        ]
    },

    reigsterRouteValidate: () => {
        return [
            body('name', 'Name doest not exists').exists(),
            body('username', 'User name does not exists').exists(),
            body('password')
                .exists().withMessage('Password does not exists')
                .isLength({min: 6}).withMessage('Passworrd must be at least 6 characters long')
                .matches('[0-9]').withMessage('Password must contain a number')
                .matches('[A-Z]').withMessage('Password must contain an uppercase letter')
                .trim() 
                .escape(),
            body('confirm_password')
                .exists().withMessage('Confirm password is required')
                .custom((value, { req }) => {
                    return value === req.body.password
                })
                .withMessage('Password do not match') 
        ]
    },

    createPostValidate: () => {
        return [
            body('title', 'Titile is required').exists(),
            body('body', 'Post\'s body is required').exists()
        ]
    },
}