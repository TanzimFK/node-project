const Post = require('../models/postModel');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        return res.json({
            status: "success",
            results: posts.results,
            data: {
                posts
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: "Failed"
        })
    }
}

exports.getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        return res.json({
            status: "success",
            data: {
                post
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: "Failed"
        })
    }
}

exports.createPost = async (req, res, next) => {
    try {
        console.log(req.params)
        console.log(typeof req.body)

        const post = await Post.create(req.body)
        return res.json({
            status: "success",
            data: {
                post
            }
        })
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            error: err
        })
    }
}


exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true

        })
        return res.json({
            status: "success",
            data: {
                post
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: "Failed"
        })
    }
}


exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        return res.json({
            status: "success"
        })
    } catch (error) {
        return res.status(400).json({
            status: "Failed"
        })
    }
}