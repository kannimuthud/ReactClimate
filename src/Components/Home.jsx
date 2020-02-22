import React, { Component } from 'react'
import '../Style/Home.css'
import Auth from './Auth'
class Home extends Component {
  state={

  }

  handleChange = event => {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })

  }
  click = (event) => {
    event.preventDefault();
    //console.log(this.state)
    const data = { email: this.state.mail, password: this.state.password }
    fetch('https://api-interlace.interlockgroup.sg/api/v1/users/login', { method: 'POST', body: JSON.stringify(data), headers: { 'content-Type': 'application/json' } })
      .then(res => res.json())
      .then(res => {
        //console.log(res)
        this.setState({
          token: res.token,
        })
        localStorage.setItem('token', JSON.stringify(this.state.token));
        Auth.isLogIn();
        if(res.success){
          this.props.history.push('/welcome');
         }
      })
      .catch(error => console.log('Error:', error))

      //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDUyNmZkN2Y4ZDg0M2ZhY2YzYjNmNSIsIm5hbWUiOnsiZmlyc3QiOiJOYXZlZW4iLCJsYXN0IjoiU2FrdGhpdmVsIn0sInJlc2V0Ijp0cnVlLCJpYXQiOjE1ODE5MzU4OTEsImV4cCI6MTU4MTkzOTQ5MX0.K-z9l4KfiBP0OtSnp9sDvfoyqMt7xVsNqoQXYUZtIlY

  }
 
  render() {
    return (
      <div    className="home"  >
        <h1>Log in</h1>
        <form onSubmit={this.click} className="form">
          <label>Email:</label>
        <input type="mail"
          name='mail'
          value={this.state.mail}
          onChange={this.handleChange} /><br/>
          <label>password:</label>
        <input type="password"
          name='password'
          value={this.state.password}
          onChange={this.handleChange} /><br/>
        <button  type="submit" >Login</button>
        </form> 
        
      </div>

    );
  }
}
export default Home