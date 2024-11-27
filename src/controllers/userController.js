const db = require('../../models/index');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
    const { name, email, last_names, password } = req.body;
    try {
        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser && !existingUser.is_deleted) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (existingUser) {
            existingUser.is_deleted = false;
            existingUser.save();
            return res.status(201).json({ message: 'User created successfully' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(uuidv4(), name, email, last_names, hashedPassword, false);
        await db.User.create(newUser);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const user = await db.User.findByPk(uuid);
        if (!user || user.is_deleted) {
            return res.status(404).json({ message: 'User not found' });

        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    let { page, limit } = req.query;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;
    const offset = (page - 1) * limit;
    try {
        const users = await db.User.findAndCountAll({ where: { is_deleted: false }, offset, limit });
        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    const { uuid } = req.params;
    let { name, email, last_names, password } = req.body;
    try {
        const user = await db.User.findByPk(uuid);
        if (!user || user.is_deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!name)
            name = user.name;
        if (!email)
            email = user.email;
        else {
            existingUser = await db.User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }
        if (!last_names)
            last_names = user.last_names;
        if (!password)
            password = user.password;
        else 
            password = await bcrypt.hash(password, 10);

        user.name = name;
        user.email = email;
        user.last_names = last_names;
        user.password = password;
        await user.save();
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const user = await db.User.findByPk(uuid);
        if (!user || user.is_deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.is_deleted = true;
        await user.save();
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
};