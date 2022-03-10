const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        validate: {
            validator: function (value) {
                if (this.isModified('description') && this.image) return true;
                if (!this.description && !this.image) return false;
            },
            message: 'Fill in either a description or upload an image'
        }
    },
    image: {
        type: String,
        validate: {
            validator: function (value) {
                if (this.isModified('image') && this.description) return true;
                if (!this.description && !this.image) return false
            },
            message: 'Fill in either a description or upload an image'
        }
    },
    dateTime: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;