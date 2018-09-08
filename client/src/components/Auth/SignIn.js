import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { SIGN_IN_USER } from '../../mutations'
import Errors from '../Errors'

const initialState = {
  username: '',
  password: '',
}
class SignIn extends Component {
  state = { ...initialState, }

  clearState = () => {
    this.setState(() => ({ ...initialState, }))
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState(() => ({ [name]: value, }))
  }

  handleSubmit = signInUser => e => {
    e.preventDefault()
    signInUser().then(async ({ data: { signInUser } }) => {
      console.log('signInUser ', signInUser.token)
      localStorage.setItem('token', signInUser.token)
      await this.props.refetch()
      this.clearState()
      this.props.history.push('/')
    })
  }

  validateForm = () => {
    const { username, password, } = this.state
    const isInvalid = !username || !password
    return isInvalid
  }

  render() {
    const { username, password, } = this.state
    return (
      <div className="App">
        <h2>Sign In</h2>
        <Mutation
          mutation={SIGN_IN_USER}
          variables={{ username, password, }}
        >
          {
           /**
            * @param {function} signInUser - mutate function
            * @param {object} mutation result containing:
            * { data, called, loading, error }
            */
          }
          {(signInUser, { data, loading, error, }) => {
            const disabledStatus = loading || this.validateForm()
            return (
              <form
                className="form"
                onSubmit={this.handleSubmit(signInUser)}
              >
                <input
                  name="username"
                  onChange={this.handleInputChange}
                  placeholder="Username"
                  type="text"
                  value={username}
                />
                <input
                  name="password"
                  onChange={this.handleInputChange}
                  placeholder="Password"
                  type="password"
                  value={password}
                />
                <button
                  className={disabledStatus ? 'button-primary disabled-button' : 'button-primary'}
                  disabled={disabledStatus}
                  type="submit"
                >
                  Submit
                </button>
                {error && <Errors error={error} />}
              </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(SignIn)