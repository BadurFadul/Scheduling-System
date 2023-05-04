import { useState } from 'react'
import Css from './ForgotPs.module.css'
import { useNavigate } from 'react-router-dom'
import ForgotService from '../../services/ForgotService'

const ForgotPs = () => {
    const [username, setUsername] = useState('')

    const navigate = useNavigate()

    const handlesubmit = async (event) => {
        event.preventDefault()
        try{
            await ForgotService.create({username})
            alert("email send to the your email address")
            navigate('/rest')
        }catch(err) {
            alert(err)
        }
      }

  return (
    <div className={Css.container}>
        <div className={Css.content}>
            <div className={Css.Header}>
            <p>Forgot Password</p>
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
            </div>  
            <button className={Css.btn}>Send email</button>
        </form>
    </div>
</div>
  )
}

export default ForgotPs