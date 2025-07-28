
const mongoose = required("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        author: { type:mongoose.Schema.Types.ObjectId, ref: "User", required: true}
    },
    {timeStamps: true}
);

module.exports = mongoose.model ("Post", PostSchema)
