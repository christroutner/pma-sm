/*
  This library encapsulates code concerned with MongoDB and Mongoose models.
*/

// Load Mongoose models.
import Users from './models/users.js'
import Usage from './models/usage.js'
import Posts from './models/post.js'
class LocalDB {
  constructor () {
    // Encapsulate dependencies
    this.Users = Users
    this.Usage = Usage
    this.Posts = Posts
  }
}

export default LocalDB
