import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { SIGN_UP_USER } from '../../mutations'
import Errors from '../Errors'

const intialState = {
  username: '',
  email: '',
  password: '',
  passwordComfirmation: '',
}
class SignUp extends Component {
  state = { ...intialState, }

  clearState = () => {
    this.setState(() => ({ ...intialState, }))
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState(() => ({ [name]: value, }))
  }

  handleSubmit = signUpUser => e => {
    e.preventDefault()
    signUpUser().then(data => {
      console.log(data)
      this.clearState()
    })
  }

  validateForm = () => {
    const { username, email, password, passwordComfirmation, } = this.state
    const isInvalid = !username || !email || !password || password !== passwordComfirmation
    return isInvalid
  }

  render() {
    const { username, email, password, passwordComfirmation, } = this.state
    return (
      <div className="App">
        <h2>Sign Up</h2>
        <Mutation
          mutation={SIGN_UP_USER}
          variables={{ username, email, password, }}
        >
          {
           /**
            * @param {function} 'signUpUser' - mutate function
            * @param {object} mutation result containing:
            * { data, called, loading, error }
            */
          }
          {(signUpUser, { data, loading, error, }) => {
            return (
              <form
                className="form"
                onSubmit={this.handleSubmit(signUpUser)}
              >
                <input
                  name="username"
                  onChange={this.handleInputChange}
                  placeholder="Username"
                  type="text"
                  value={username}
                />
                <input
                  name="email"
                  onChange={this.handleInputChange}
                  placeholder="Email"
                  type="email"
                  value={email}
                />
                <input
                  name="password"
                  onChange={this.handleInputChange}
                  placeholder="Password"
                  type="password"
                  value={password}
                />
                <input
                  name="passwordComfirmation"
                  onChange={this.handleInputChange}
                  placeholder="Comfirm password"
                  type="password"
                  value={passwordComfirmation}
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

export default SignUp