const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useCreateIndex', true)

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
  },
})

// Recipe index to optimise search and
// specify which to search on
RecipeSchema.index({
  // Search every field within recipe and
  // set it to text
  '$**': 'text',
})

module.exports = mongoose.model('Recipe', RecipeSchema)