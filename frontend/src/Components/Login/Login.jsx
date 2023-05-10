import Css from './Login.module.css'
import { Link } from 'react-router-dom'

const Login = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username,password}) => {

  return (
    <div className={Css.container}>
        <div className={Css.content}>
            <div className={Css.Header}>
                <p>Universiy of Applied Sciences Novia</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={Css.formpad}>
                    <div>
                        <p>Let's do this!</p>
                    </div>
                <div className={Css.formdiv}>
                    <label htmlFor="username">username</label>
                    <input className={Css.input} 
                    type="text" 
                    placeholder='username'
                    value={username}
                    onChange={handleUsernameChange} 
                    />
                </div>
                <div className={Css.formdiv}>
                    <label htmlFor="Password">Password</label>
                    <input className={Css.input} 
                    type="text"
                    placeholder='Password' 
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </div>
                </div>
                <Link to="/forgot">
                    forgot password
                </Link>  
                <button className={Css.btn} type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login