import { useState, useEffect } from "react"
import { Login, Header, Home, Teacher } from "./Components"
import LoginServices from "./services/LoginServices"
import CourseServerice from "./services/CourseServerice"
import ExamsService from "./services/ExamsService"
import './App.css'
import {
  BrowserRouter as Router,
  Routes, Route, useNavigate, json
} from 'react-router-dom'

function App() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ErrorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  //Getting courses
  useEffect(() => {
    CourseServerice.getAll().then(courses => console.log(courses))
  },[])

  //Getting exams
  useEffect(() => {
    ExamsService.getAll().then(exam => console.log(exam))
  })

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

  return (
    <div>
      {user ? <Header user={user} handlelogout={handlelogout} /> : null}
        <Routes>
        <Route path="/login" element= {<Login 
        username={username}
        password={password}
        handleUsernameChange={({target}) => setUsername(target.value)}
        handlePasswordChange={({target}) => setPassword(target.value)}
        handleSubmit={handleLogin}
        />}/>
        <Route path="/" element= {<Home />}/>
        <Route path="/teacher" element= {<Teacher user={user}/>}/>
      </Routes>
    </div>
      
      
  )
}

export default App
