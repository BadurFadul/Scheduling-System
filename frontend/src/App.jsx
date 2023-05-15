import { useState, useEffect } from "react"
import { Login, Header, Home, Teacher, ForgotPs, Rest } from "./Components"
import LoginServices from "./services/LoginServices"
import CourseServerice from "./services/CourseServerice"
//import ExamsService from "./services/ExamsService"
import './App.css'
import {
  Routes, 
  Route, 
  useNavigate,
  Outlet,
  Navigate
} from 'react-router-dom'

function App() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [ErrorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  //Getting courses
 /* useEffect(() => {
    CourseServerice.getAll().then(courses => console.log(courses))
  },[])

  //Getting exams
  useEffect(() => {
    ExamsService.getAll().then(exam => console.log(exam))
  },[])*/

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      CourseServerice.setToken(user.token)
    }
  },[])

  //login
  const handleLogin = async ( event ) =>{
      event.preventDefault()
      try{
          const user = await LoginServices.login({
              username, password
          })
          window.localStorage.setItem(
              'loggedUser', JSON.stringify(user)
            )
            CourseServerice.setToken(user.token)
            console.log('token', user.token) 
          setUser(user)
          setUsername('')
          setPassword('')
          navigate('/')
      } catch ( exception) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        }
  }

  //logout
  const handlelogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
    navigate('/login')
 
  }

  const DefaultLayout = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />
    }
  
    return (
      <div className="default-layout">
        <Header user={user} handlelogout={handlelogout} />
        {children}
      </div>
    );
  };
  
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />} />
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/teacher" element={<DefaultLayout><Teacher user={user} /></DefaultLayout>} />
        <Route path="/reset" element={<Rest />} />
        <Route path="/forgot" element={<ForgotPs />} />
      </Routes>
    </div>
  );
}

export default App