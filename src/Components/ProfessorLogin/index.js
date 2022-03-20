import "./index.css"
import {Component} from"react"

import Cookies from 'js-cookie'
import Cookie from 'js-cookie'
import Header from "../Header"

class ProfessorLogin extends Component{
  state = {
        username: '',
        password: '',
        showSubmitError: false,
        errorMsg: '',
  }
  onSubmitSuccess = data => {
    const{jwtToken,id}=data
    Cookies.set('jwt_token', jwtToken, {
    expires: 30,
    path: '/',
    })
    Cookies.set('p_id', id, {
      expires: 30,
      path: '/',
      })
    window.location.replace(`http://localhost:3004/professor/${id}`)
    
  }
    
  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }
    
  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'http://localhost:3005/professorlogin'
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.x)
      } else {
        this.onSubmitFailure(data.error_msg)
        }
  }
  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }
    
  onChangePassword = event => {
    this.setState({password: event.target.value})
  }
  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }
  
  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
         PROFESSOR USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }


   render(){ 
     const {errorMsg,showSubmitError}=this.state
     const token = Cookie.get('jwt_token')
     const p_id=Cookie.get('p_id')
     const s_id=Cookie.get('s_id')
    if(token!== undefined && p_id!==undefined){
      window.location.replace(`http://localhost:3004/professor/${p_id}`)
    }
    if(token!== undefined && p_id!==undefined){
      window.location.replace(`http://localhost:3004/student/${s_id}`)
    }
   return(<form className="h-cont" onSubmit={this.submitForm} >
        <Header/>
        <div className="cont">
        <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </div>
    </form>)}
}


export default ProfessorLogin