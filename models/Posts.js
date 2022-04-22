const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    desc: {
        type: String,
        max: 50
    },
    likes: {
        type: Array,
        default: []
    },
    Comments: {
        type: String,
        default: ""
    }

},
    { timestamps: true }
);

module.exports = mongoose.model("Posts", PostSchema);