const router = require('express').Router();
const userController = require('../controllers/userController');
const { authenticated } = require('../utils/jwt');
const { reigsterRouteValidate } = require('../utils/validator');

router.post('/', authenticated, reigsterRouteValidate() , userController.createUser);
router.get('/:username', authenticated, userController.getUserByUserName);
router.get('/:username/followers', authenticated, userController.getFollowersByUserName);
router.get('/:username/following', authenticated, userController.getFollowingsByUserName);
router.post('/:username/follow', authenticated, userController.follow);
router.delete('/:username/unfollow', authenticated, userController.unfollow);

module.exports = router;