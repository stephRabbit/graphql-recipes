const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

mongoose.set('useCreateIndex', true)

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  favorites: {
    type: [ Schema.Types.ObjectId ],
    ref: 'Recipe',
  },
})

// Before user is saved to DB
// Normal function to carry (this) keyword
UserSchema.pre('save', function(next) {
  // Check if the password is not modified move
  // to next function because we are not signing up a user
  if (!this.isModified('password')) return next()

  // Hash user password
  bcrypt.genSalt(10, (err, salt) => {
    // Incase ther is an error pass it to the next function
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      // Incase ther is an error pass it to the next function
      if (err) return next(err)

      // Set the hash password to this.password
      // then move to the next function
      this.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('User', UserSchema)