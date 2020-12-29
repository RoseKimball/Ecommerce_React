const Product = require('../models/product');
const slugify = require('slugify');

exports.create =  async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message 
        })
    }
}

exports.listAll = async (req, res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('Category')
        .sort([['createdAt', 'desc']])
        .exec()
    res.json(products);
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndRemove({slug: req.params.slug}).exec();
        res.json(deleted)
    } catch (err) {
        console.log(err)
        return res.status(400).send('product delete failed')
    }
}

exports.read = async (req, res) => {
    // console.log('backend slug', req.params.slug)
    const product = await Product.findOne({slug: req.params.slug})
    .populate('Category')
    .exec();

    return res.json(product);
    // console.log('backend response', res.json(product))
}

exports.update = async (req, res) => {
    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updated = await Product.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true}).exec();
        return res.json(updated);
    } catch (err) {
        console.log(err);
        return res.status(400).send('product update failed')
    }
}

exports.list = async (req, res) => {
    try {
        const {sort, order, page} = req.body;
        const currentPage = page || 1;
        const perPage = 3;

        const products = await Product.find({})
        .skip((currentPage - 1) * perPage)
        .populate('Category')
        .sort([[sort, order]])
        .limit(perPage)
        .exec();

        return res.json(products);
    } catch(err) {
        console.log(err);
    }
}

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total); 
}

exports.listRelated = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();

    const related = await Product.find({
        _id: { $ne: product._id},
        category: product.category
    })
    .limit(3)
    .populate('Category')
    .exec();
    // .populate('postedBy')

    res.json(related);
}