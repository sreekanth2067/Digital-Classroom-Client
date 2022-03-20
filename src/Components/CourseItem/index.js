import "./index.css"
import{Component} from "react"
import Cookies from 'js-cookie'
import Cookie from 'js-cookie'

class CourseItem extends Component{
    state={data:[],isLoading:true,isProfessor:false}
    renderLoading(){
        return (
            <div  className="load-cont" >
                <div className="loader" ></div></div>
        )
    }

    addingStudent=async()=>{
        const {data}=this.state
        const student_id=document.getElementById('student').value
        const details={
            course_id:data[0].course_id,
            student_id,
        }
        const url = 'http://localhost:3005/addstudent'
        const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data1 = await response.json()
        alert("added succesfully")

    }
    loggingout=()=>{
        Cookies.remove('jwt_token')
        Cookies.remove('p_id')
        Cookies.remove('s_id')
        window.location.replace(`http://localhost:3004/`)
    }

    componentDidMount(){
        this.getCourseDetails()
    }
    getCourseDetails=async()=>{
        const p_id=Cookie.get('p_id')
      if(p_id!==undefined){
            this.setState({isProfessor:true})
      }
      else{
        this.setState({isProfessor:false})
      }
        const id=window.location.pathname
        const apiUrl = `http://localhost:3005${id}`
    const options = {
      
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      this.setState({
        data: fetchedData,
        isLoading: false,
      })
    } 
  }
  renderProfessor(){
      const{data,isProfessor}=this.state
      
      return(
          <div>
          <div className="p-cont">
              <h1>Professor Name : {data[0].professor_name}</h1>
              <p>Professor Email : {data[0].professor_email}</p>
              
            <div className="c-cont">
                <h1>
                    Students List
                </h1>
                <div className="courses-cont" >
                    {data.map(eachItem=>
                        <div className="course-cont" key={data.course_id}>
                        <h1> Student Id : {eachItem.student_id}</h1>
                        <p> Student Name : {eachItem.student_name}</p>
                        <p>Student Email : {eachItem.student_email}</p>
                    </div>
                        )}
                    
                    </div>
                    {isProfessor ? <div>
                        <input type="text" id="student" placeholder="Add student by his id" />
                        <button onClick={this.addingStudent}>add student</button>
                    </div> :<p></p>}
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

export default CourseItem