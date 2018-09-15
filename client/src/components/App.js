import React, { Component } from 'react'
import { Query } from 'react-apollo'
import posed from 'react-pose'

import { GET_ALL_RECIPES } from '../queries'
import './App.css'
import Spinner from './Spinner'
import RecipeItem from './Recipe/RecipeItem'

const RecipeList = posed.ul({
  visible: {
    x: '0%',
    staggerChildren: 100,
  },
  hidden: {
    x: '100%',
  },
})
class App extends Component {
  state = {
    on: false
  }

  componentDidMount() {
    setTimeout(this.handlePosedSlideIn, 500)
  }

  handlePosedSlideIn = () => {
    this.setState(() => ({ on: !this.state.on }))
  }

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          Find Recipes you <strong>Love</strong>
        </h1>
        <Query query={GET_ALL_RECIPES}>
          {
           /**
            * @param {object} query - result containing:
            * { data, called, loading, error }
            */
          }
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>
            const { on } = this.state
            return (
              <RecipeList
                className="cards"
                pose={on ? 'visible' : 'hidden' }
              >
                {data && data.getAllRecipes.map(recipe => <RecipeItem key={recipe._id} {...recipe} />)}
              </RecipeList>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default App
