import header from './Header.module.css'
import { Link } from 'react-router-dom'

const Header = ({user, handlelogout}) => {
  return (
    <div className={header.container}>
        <div className={header.logo}>
            Logo
        </div>
        <div className={header.info}>
            <div className={header.links}>
                <ul>
                    <Link to="/teacher">Teacher</Link>
                    <Link to="/home">Home</Link>
                </ul>
            </div>
        </div>
            <div className={header.user}>
                   {user? user.name: null}
            </div>
            <div className={header.login}>
                <button onClick={handlelogout}>Log out</button>
            </div>
            <br/>
    </div>
    
  )
}

export default Header