import Css from './Login.module.css'

const Login = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username,password}) => {

  return (
    <div className={Css.container}>
        <div className={Css.img}>
            
        </div>
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
                <button className={Css.btn} type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login