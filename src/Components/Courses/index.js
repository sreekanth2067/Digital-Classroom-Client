import "./index.css"
import {Link} from "react-router-dom"
import Cookie from 'js-cookie'
import Cookies from 'js-cookie'

import {Component} from "react"

class Course extends Component{
    state={isLoading:true,
    coursesList:[]
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
        const apiUrl = 'http://localhost:3005/courses'
    const options = {
      
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.setState({
        coursesList: fetchedData,
        isLoading: false,
      })
    } 
  }
  renderCourses(){
      const{coursesList}=this.state
      return(
          <div className="c-cont">
              <h1>
                  Courses List
              </h1>
            <div className="courses-cont" >
            {coursesList.map(eachItem=>
                <div className="course-cont" key={eachItem.course_id}>
                    <h1>{eachItem.course_id}</h1>
                    <Link to={`/course/${eachItem.course_id}`}><p>  {eachItem.course_name}</p></Link>
                    <Link to={`/professor/${eachItem.professor_id}`}><p  >{eachItem.professor_name} </p></Link>
                </div>
                )}
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
            {isLoading ? this.renderLoading():this.renderCourses()}
        </div>)

    }
}

export default Course