const Product = require('./../models/productModel');

exports.getAllProducts = async (req, res) => {
    try {
        const pageOptions = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.pageSize) || 10
        }
        const count = await Product.countDocuments();
        const products = await Product.find()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .populate('category', 'name');
        res.status(200).json({
            status: 'success',
            count,
            data: {
                products
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        });
    }
}

exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate('category', 'name');
        res.status(200).json({
            status: 'success',
            data: {
                products: product
            }
        });
    } catch (err) {
        res.status(491).json({
            status: 'fail',
            message: 'Not found'
        });
    }
}

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Bad request',
            err: err
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Product updated successfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Not found',
            err: err
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Not found'
        });
    }
}
