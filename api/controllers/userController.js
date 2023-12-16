import User from "../models/User.js"
import { createError } from '../utils/error.js';

export const createUser = async (req, res, next) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        next(createError(500, "Failed to create a new User."));
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        next(createError(500, "Failed to update the User."));
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(createError(500, "Failed to delete the User."));
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!User) {
            return next(createError(404, "User not found."));
        }
        res.status(200).json(user);
    } catch (err) {
        next(createError(500, "Failed to retrieve the User."));
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(createError(500, "Failed to retrieve the list of Users."));
    }
}

