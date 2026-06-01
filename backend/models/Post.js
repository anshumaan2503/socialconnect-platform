const mongoose = require("mongoose");

/**
 * @description Like subschema
 */
const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Liking user ID is required"],
    },
    username: {
      type: String,
      required: [true, "Liking username is required"],
    },
    likedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Do not create an ID for nested likes
);

/**
 * @description Comment subschema
 */
const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Commenting user ID is required"],
  },
  username: {
    type: String,
    required: [true, "Commenting username is required"],
  },
  text: {
    type: String,
    required: [true, "Comment text is required"],
    trim: true,
    maxlength: [500, "Comment cannot exceed 500 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * @description Main Post schema
 */
const postSchema = new mongoose.Schema(
  {
    author: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author user ID is required"],
        index: true,
      },
      username: {
        type: String,
        required: [true, "Author username is required"],
      },
      avatar: {
        type: String,
        required: [true, "Author avatar is required"],
      },
    },
    content: {
      text: {
        type: String,
        trim: true,
      },
      imageUrl: {
        type: String,
        trim: true,
      },
    },
    likes: [likeSchema],
    comments: [commentSchema],
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 1. Indexing for chronological feed queries
postSchema.index({ createdAt: -1 });

// 2. Text Search index for content search and user queries
postSchema.index({
  "content.text": "text",
  "author.username": "text",
});

// 3. Schema-level validation ensuring at least text or image is present
postSchema.pre("validate", function (next) {
  const textExists = this.content && this.content.text && this.content.text.trim().length > 0;
  const imageExists = this.content && this.content.imageUrl && this.content.imageUrl.trim().length > 0;

  if (!textExists && !imageExists) {
    this.invalidate("content", "Post content must contain either text or an image URL");
  }
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
