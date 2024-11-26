const { body, param, query } = require('express-validator');

createUserValidation = [
    body('name').exists().isString().isLength({ max: 15 }),
    body('email').exists().isEmail().isLength({ max: 100 }),
    body('last_names').exists().isString().isLength({ max: 100 }),
    body('password').exists().isString().isLength({ max: 30}),
];

getUserValidation = [
    param('uuid').exists().isUUID()
];

getUsersValidation = [
    query('page').optional().isInt(),
    query('limit').optional().isInt(),
];

updateUserValidation = [
    param('uuid').exists().isUUID(),
    body('name').optional().isString().isLength({ max: 15 }),
    body('email').optional().isEmail().isLength({ max: 100 }),
    body('last_names').optional().isString().isLength({ max: 100 }),
    body('password').optional().isString().isLength({ max: 30 }),
];

deleteUserValidation = [
    param('uuid').exists().isUUID()
];

module.exports = {
    createUserValidation,
    getUserValidation,
    getUsersValidation,
    updateUserValidation,
    deleteUserValidation
};