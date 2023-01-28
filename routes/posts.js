const router = require('express').Router();
const postController = require('../controllers/postController');
const { createPostValidate } = require('../utils/validator');

router.get('/', postController.getAll); 
router.post('/', createPostValidate(), postController.create); 
router.get('/:id', postController.getSingle); 
router.put('/:id', postController.update); 
router.delete('/:id', postController.delete);

module.exports = router;