import { createError } from "../error.js";
import Item from "../models/Items.js";
import User from '../models/Users.js';


export const addItem = async (req, res, next) => {
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (error) {
        next(error)
    }
};

export const getAllItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json(items)
    } catch (error) {
        next(error);
    }
}

export const getByCategory = async (req, res, next) => {
    const category = req.params.category
    try {
        const items = await Item.find({category:category});
        res.status(200).json(items)
    } catch (error) {
        next(error);
    }
}

export const getItemById = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        res.status(200).json(item)
    } catch (error) {
        next(error);
    }
}
