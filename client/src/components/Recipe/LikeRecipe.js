import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { LIKE_RECIPE, UNLIKE_RECIPE } from '../../mutations'
import { GET_RECIPE } from '../../queries'
import withSession from '../../hoc/withSession'


export class LikeRecipe extends Component {
  state = {
    liked: false,
    username: '',
  }

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser
      const { _id } = this.props
      // Check if recipe being is the same as the one in our favorites
      const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1
      this.setState(() => ({
        liked: prevLiked,
        username,
      }))
    }
  }

  handleLike = (likeRecipe, unlikeRecipe) => {
    if (this.state.liked) {
      likeRecipe().then(async ({ data }) => {
        await this.props.refetch()
      })
    }
    else {
      unlikeRecipe().then(async ({ data }) => {
        await this.props.refetch()
      })
    }
  }

  handleLikeClick = (likeRecipe, unlikeRecipe) => () => {
    this.setState(prevState => ({
      liked: !prevState.liked
    }),
      // Syncronus
      () => this.handleLike(likeRecipe, unlikeRecipe)
    )
  }

  updateLike = (cache, { data: { likeRecipe }, }) => {
    // Get cache query
    const { _id } = this.props
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id }})

    // Update cache with new data
    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 },
      },
    })
  }

  updateUnlike = (cache, { data: { unlikeRecipe }, }) => {
    // Get cache query
    const { _id } = this.props
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id }})

    // Update cache with new data
    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 },
      },
    })
  }

  render() {
    const { liked, username, } = this.state
    const { _id, } = this.props
    return (
      <Mutation
        mutation={UNLIKE_RECIPE}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeRecipe => {
          return (
            <Mutation
              mutation={LIKE_RECIPE}
              variables={{ _id, username }}
              update={this.updateLike}
            >
              {likeRecipe => (
                username && (
                  <button onClick={this.handleLikeClick(likeRecipe, unlikeRecipe)}>
                    {liked ? 'Unliked' : 'Like'}
                  </button>
                )
              )}
            </Mutation>
          )
        }}
      </Mutation>
    )
  }
}

export default withSession(LikeRecipe)
