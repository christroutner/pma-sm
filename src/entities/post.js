/*
  Post Entity
*/

class Post {
  validate ({ ownerId, createdAt, postContent, likes } = {}) {
    // Input Validation
    if (!ownerId || typeof ownerId !== 'string') {
      throw new Error("Property 'ownerId' must be a string!")
    }

    if (!postContent || typeof postContent !== 'string') {
      throw new Error("Property 'postContent' must be a string!")
    }
    if (likes && !Array.isArray(likes)) {
      throw new Error("Property 'likes' must be an array!")
    }

    const postData = { ownerId, createdAt, postContent, likes }

    return postData
  }
}

export default Post
