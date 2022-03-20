import "./index.css"
import {Link} from "react-router-dom"
import Cookie from 'js-cookie'

const Header=()=>{
    const fun=()=>{
        const token = Cookie.get('jwt_token')
        if(token===undefined){
        alert("Please Login")
    }
    else{
        window.location.assign (`http://localhost:3004/courses`)
    }
    }
    return(
    <div className=" head-cont ">
        <Link to="/"><h1 className="para3">Digital Classroom</h1></Link>
        <p>A Online Portal for All Courses</p>
        <div className="hcont1 ">
            <Link to="/ProfessorLogin"><p className="para3">Professor Login</p></Link>
            <Link to="/StudentLogin"><p className="para3">Student Login</p></Link>
            <p onClick={fun} className="para3"> Courses</p>
        </div>
    </div>)
}
export default Header