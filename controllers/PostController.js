import PostModel from "../models/Post.js";


export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();
        res.status(200).json(post);

    } catch (err) {
        res.status(500).json({
            "error": err,
        });
    }
};


export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user', '-passwordHash -__v -createdAt -createdAt').exec();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({
            "error": err,
        });
    }
}


export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate({
                _id: postId,
            }, {
                $inc: {viewsCount: 1},
            }, {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    res.status(500).json({
                        "error": err,
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: "Can not found artificle/s",
                        errors: err,
                    });
                }
                res.status(200).json(doc);
            }
        );
    } catch (err) {
        res.status(500).json({
            "error": err,
        });
    }
}


export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndDelete({
            _id: postId,
        }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: "Can not delete post",
                    errors: err,
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: "Can not find post",
                    errors: err,
                });
            }

            res.status(200).json({
                message: "Article deleted",
            });
        });

    } catch (err) {
        res.status(500).json({
            "error": err,
        });
    }
}


export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        res.status(200).json({
            message: "Article updated",
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Updating not success",
        });
    }
}
