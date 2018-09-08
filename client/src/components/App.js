import React from 'react'
import { Query } from 'react-apollo'

import { GET_ALL_RECIPES } from '../queries'
import './App.css'
import RecipeItem from './Recipe/RecipeItem'

const App = () => {
  return (
    <div className="App">
      <h1>Home</h1>
      <Query query={GET_ALL_RECIPES}>
        {
         /**
          * @param {object} query - result containing:
          * { data, called, loading, error }
          */
        }
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>
          console.log(data)
          return (
            <ul>
              {data && data.getAllRecipes.map(recipe => <RecipeItem  key={recipe._id} {...recipe} />)}
            </ul>
          )
        }}
      </Query>
    </div>
  )
}

export default App
