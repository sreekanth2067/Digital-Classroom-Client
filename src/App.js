import Home from "./Components/Home" 
import ProfessorLogin from "./Components/ProfessorLogin";
import StudentLogin from "./Components/StudentLogin";
import Course from "./Components/Courses";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Professor_details from "./Components/Professor_details" 
import Student_details from "./Components/Student_details";
import CourseItem from "./Components/CourseItem";
import './App.css'


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/ProfessorLogin" element={<ProfessorLogin/>} />
      <Route exact path="/StudentLogin" element={<StudentLogin/>} />
      <Route exact path="/courses" element={<Course/>} />
      <Route exact path="/professor/:id"element={<Professor_details />} />
      <Route exact path="/student/:id"element={<Student_details />} />
      <Route exact path="/course/:id"element={<CourseItem />} />
    </Routes>
  </BrowserRouter>
)


export default App;
