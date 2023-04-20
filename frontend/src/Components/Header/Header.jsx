import header from './Header.module.css'
import { Link } from 'react-router-dom'
import Home from '../Home/Home'

const Header = ({user, handlelogout}) => {
  return (
    <div className={header.container}>
        <div className={header.logo}>
            Logo
        </div>
            <div className={header.user}>
                   
            </div>
            <div className={header.login}>
                <Link to="/teacher">Teacher</Link>
                <button onClick={handlelogout}>Log out</button>
                <p>{user? user.name: null} </p>
            </div>
    </div>
    
  )
}

export default Header