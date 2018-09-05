import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { SIGN_IN_USER } from '../../mutations'
import Errors from '../Errors'

const intialState = {
  username: '',
  password: '',
}
class SignIn extends Component {
  state = { ...intialState, }

  clearState = () => {
    this.setState(() => ({ ...intialState, }))
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState(() => ({ [name]: value, }))
  }

  handleSubmit = signInUser => e => {
    e.preventDefault()
    signInUser().then(data => {
      console.log(data)
      this.clearState()
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
            * @param {function} 'signInUser' - mutate function
            * @param {object} mutation result containing:
            * { data, called, loading, error }
            */
          }
          {(signInUser, { data, loading, error, }) => {
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
                  className={
                    loading || this.validateForm()
                      ? 'button-primary  disabled-button'
                      : 'button-primary'
                  }
                  disabled={loading || this.validateForm()}
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

export default SignIn