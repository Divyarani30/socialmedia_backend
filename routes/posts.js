const router = require("express").Router();
const Post = require("../models/Posts");


router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const addPost = await Post.create(newPost);
        res.status(200).json({
            message: "post uploaded successfully",
            post: addPost
        });

    } catch (error) {
        res.status(500).json({
            message: "facing issue while upload post, please try again"
        })
        console.log("facing issue while upload post", error)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const findPost = await Post.findById(req.params.id);
        if (findPost.userId === req.body.userId) {
            await Post.updateOne({ $set: req.body });
            res.status(200).json({
                message: "the post has been updated"
            })
        } else {
            res.status(403).json({
                message: "you can update only your post"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
        console.log("error while update post", error)
    }
});

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await Post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json({
                message: "you have liked this post"
            })
        } else {
            await Post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json({
                message: "you have disliked this post"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
        console.log("error while like post", error)
    }
});

router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id })
        const followersPosts = await Promise.all(
            currentUser.followings.map((followersId) => {
                return Post.find({ userId: followersId });
            })
        );
        res.json(userPosts.concat(...followersPosts))

    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
        console.log("error while fetching posts", error)

    }
});

module.exports = router;