import Css from './Rest.module.css'
import { useState } from 'react'
import ResetService from '../../services/ResetService'
import { useNavigate } from 'react-router-dom'

const Rest = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [code, setcode] = useState('')

    const navigate = useNavigate()

    const handlesubmit = async (event) => {
        event.preventDefault()
        try{
            await ResetService.create({username, password, code})
            alert("Password has been reset succefully")
            navigate('/login')
        }catch(err) {
            alert(err)
        }
      }

  return (
    <div className={Css.container}>
        <div className={Css.content}>
            <div className={Css.Header}>
            <p>Reset Password</p>
            </div>
        <form onSubmit={handlesubmit}>
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
                onChange={({target}) => setUsername(target.value)} 
                />
            </div>
            <div className={Css.formdiv}>
                <label htmlFor="code">code</label>
                <input className={Css.input} 
                type="text" 
                placeholder='code'
                value={code}
                onChange={({target}) => setcode(target.value)} 
                />
            </div>
            <div className={Css.formdiv}>
                <label htmlFor="username"> New Password</label>
                <input className={Css.input} 
                type="text" 
                placeholder='Password'
                value={password}
                onChange={({target}) => setPassword(target.value)} 
                />
            </div>
            </div>  
            <button className={Css.btn} type='submit'>Reset</button>
        </form>
    </div>
</div>
  )
}

export default Rest