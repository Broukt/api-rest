const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
    createUserValidation,
    getUserValidation,
    getUsersValidation,
    updateUserValidation,
    deleteUserValidation
} = require('../helpers/validator');
const validateFields = require('../middleware/errorHandler');

router.post('/', createUserValidation, validateFields, userController.createUser);
router.get('/:uuid', getUserValidation, validateFields, userController.getUser);
router.get('/', getUsersValidation, validateFields, userController.getUsers);
router.patch('/:uuid', updateUserValidation, validateFields, userController.updateUser);
router.delete('/:uuid', deleteUserValidation, validateFields, userController.deleteUser);

module.exports = router;