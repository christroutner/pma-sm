/*
  Post Entity
*/

class Post {
  validate ({ ownerId, createdAt, postContent } = {}) {
    // Input Validation
    if (!ownerId || typeof ownerId !== 'string') {
      throw new Error("Property 'ownerId' must be a string!")
    }

    if (!postContent || typeof postContent !== 'string') {
      throw new Error("Property 'postContent' must be a string!")
    }

    const postData = { ownerId, createdAt, postContent, likes: [] }

    return postData
  }
}

export default Post
