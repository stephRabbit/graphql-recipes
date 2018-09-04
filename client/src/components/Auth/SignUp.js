import React, { Component } from 'react'

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordComfirmation: '',
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState(() => ({ [name]: value, }))
  }

  render() {
    const { username, email, password, passwordComfirmation } = this.state
    return (
      <div className="App">
        <h2>Signup</h2>
        <form className="form">
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
            type="text"
            value={passwordComfirmation}
          />
          <button
            className="button-primary"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default SignUp