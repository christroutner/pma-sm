/*
  This library contains business-logic for dealing with users. Most of these
  functions are called by the /post REST API endpoints.
*/

import PostEntity from '../entities/post.js'

import wlogger from '../adapters/wlogger.js'

class PostLib {
  constructor (localConfig = {}) {
    this.adapters = localConfig.adapters
    if (!this.adapters) {
      throw new Error(
        'Instance of adapters must be passed in when instantiating Post Use Cases library.'
      )
    }

    // Encapsulate dependencies
    this.PostEntity = new PostEntity()
    this.PostModel = this.adapters.localdb.Posts

    // Bind all methods to the class instance.
    this.createPost = this.createPost.bind(this)
    this.getAllPosts = this.getAllPosts.bind(this)
    this.getPost = this.getPost.bind(this)
    this.updatePost = this.updatePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }

  // Create a new post model and add it to the Mongo database.
  async createPost (postObj) {
    try {
      // Input Validation

      const postEntity = this.PostEntity.validate(postObj)
      const post = new this.PostModel(postEntity)
      post.createdAt = new Date()

      await post.save()

      return post.toJSON()
    } catch (err) {
      wlogger.error('Error in lib/posts.js/createPost()')
      throw err
    }
  }

  // Returns an array of all post models in the Mongo database.
  async getAllPosts () {
    try {
      // Get all post models.
      const posts = await this.PostModel.find({})

      return posts
    } catch (err) {
      wlogger.error('Error in lib/users.js/getAllUsers()')
      throw err
    }
  }

  // Get the model for a specific post.
  async getPost (params) {
    try {
      const { id } = params

      const post = await this.PostModel.findById(id)

      // Throw a 404 error if the user isn't found.
      if (!post) {
        const err = new Error('Post not found')
        err.status = 404
        throw err
      }

      return post
    } catch (err) {
      // console.log('Error in getPost: ', err)

      if (err.status === 404) throw err

      // Return 422 for any other error
      err.status = 422
      err.message = 'Unprocessable Entity'
      throw err
    }
  }

  async updatePost (existingPost, newData) {
    try {
      if (newData.postContent && typeof newData.postContent !== 'string') {
        throw new Error("Property 'postContent' must be a string!")
      }
      if (newData.likes && !Array.isArray(newData.likes)) {
        throw new Error("Property 'likes' must be an array!")
      }

      existingPost.postContent = newData.postContent
      existingPost.likes = newData.likes
      existingPost.updatedAt = new Date()

      // Save the changes to the database.
      await existingPost.save()

      return existingPost
    } catch (err) {
      wlogger.error('Error in lib/posts.js/updatePost()')
      throw err
    }
  }

  async deletePost (post) {
    try {
      await post.remove()
    } catch (err) {
      wlogger.error('Error in lib/posts.js/deletePost()')
      throw err
    }
  }
}

export default PostLib
