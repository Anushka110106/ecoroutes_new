const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, register, login } = require('../controllers/userController');

const router = express.Router();

// Add your routes
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Add auth routes (if you have them)
router.post('/register', register);
router.post('/login', login);

module.exports = router;
