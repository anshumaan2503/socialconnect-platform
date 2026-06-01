const Post = require("../models/Post");

/**
 * @description Searches posts using Mongoose full-text search index
 * @param {String} q - Search query term
 * @param {Number} page - Pagination page index
 * @param {Number} limit - Pagination items limit
 */
const searchPosts = async (q, page, limit) => {
  const skip = (page - 1) * limit;

  // Query posts using MongoDB $text operator
  const query = { $text: { $search: q } };

  // Fetch paginated results and total matched count
  const [posts, totalPosts] = await Promise.all([
    Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Post.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalPosts / limit);
  const hasNextPage = page < totalPages;

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      hasNextPage,
    },
  };
};

module.exports = {
  searchPosts,
};
