import "./index.css"

import Cookie from 'js-cookie'
import Cookies from 'js-cookie'

import {Component} from "react"

class Professor_details extends Component{
    state={isLoading:true,
        data:[]
    }
    renderLoading(){
        return (
            <div  className="load-cont" >
                <div className="loader" ></div></div>
        )
    }
    loggingout=()=>{
        Cookies.remove('jwt_token')
        Cookies.remove('p_id')
        Cookies.remove('s_id')
        window.location.replace(`http://localhost:3004/`)
    }
    componentDidMount(){
        this.getCourses()
    }
    getCourses=async()=>{
        const token = Cookie.get('jwt_token')
        const id=Cookie.get('p_id')
        const apiUrl = `http://localhost:3005/professor/${id}`
    const options = {
      
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.setState({
        data: fetchedData,
        isLoading: false,
      })
    } 
  }
  renderProfessor(){
      const{data}=this.state
      return(
          <div className="p-cont">
              <h1> Professor Name : {data.professor_name}</h1>
            <div className="c-cont">
                <h1>
                    Courses List
                </h1>
                <div className="courses-cont" >
                    <div className="course-cont" key={data.course_id}>
                        <h1> Course id : {data.course_id}</h1>
                        <p> Course Name : {data.course_name}</p>
                    </div>
                    </div>
                </div>
                <button className="login-button" onClick={this.loggingout} >Log out</button>
            </div>
      )
  }
    render(){
        const token = Cookie.get('jwt_token')
        const id=Cookie.get("p_id")
        if (token === undefined) {
            window.location.replace("http://localhost:3004/")
        }
        const {isLoading}=this.state
        return (<div>
            {isLoading ? this.renderLoading():this.renderProfessor()}
        </div>)

    }
}

export default Professor_details