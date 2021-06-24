const Category = require('./../models/categoryModel');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: {
                categories
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        });
    }
}

exports.getCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        res.status(200).json({
            status: 'success',
            data: {
                categories: category
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Not Found'
        });
    }
}

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                categories: category
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Bad Request'
        });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await Category.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Category updated successfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Not found'
        });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await Category.findByIdAndDelete(id);
        res.status(200).json({
            status: 'success',
            message: 'Category deleted successfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Not found'
        });
    }
}