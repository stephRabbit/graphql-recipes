import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'

import { SEARCH_RECIPES } from '../../queries'
import SearchResultItem from './SearchResultItem'
class Search extends Component {
  state = {
    searchResults: []
  }

  handleSearch = client => async e => {
    e.persist()

    const { data } = await client.query({
      query: SEARCH_RECIPES,
      variables: { searchTerm: e.target.value },
    })

    return this.handleSearchChange(data)
  }

  handleSearchChange = ({ searchRecipes }) => {
    this.setState(() => ({ searchResults: searchRecipes, }))
  }

  render() {
    const { searchResults } = this.state
    return (
      // Consumer used due client interaction
      // when performing search query
      <ApolloConsumer>
        {client => {
          return (
            <div className="App">
              <input
                placeholder="Search recipes..."
                type="search"
                onChange={this.handleSearch(client)}
              />
              <ul>
                {searchResults.map(recipe => <SearchResultItem key={recipe._id} {...recipe} />)}
              </ul>
            </div>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default Search
