import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { unauthenticateUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { onLogout } from '../api/auth'

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
      localStorage.removeItem('role')
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <nav className='navbar navbar-light bg-light'>
      <div className='container'>
        <div>
          <NavLink to='/'>
            <span className='navbar-brand mb-0 h1'>Home</span>
          </NavLink>
        </div>

        {isAuth ? (
          <div>
            <NavLink to='/login'>
              <button onClick={() => logout()} className='btn btn-primary'>
              Logout
              </button>  
            </NavLink>
            
          </div>
        ) : (
          <div>
            <NavLink to='/login'>
              <span>Login</span>
            </NavLink>

            <NavLink to='/register' className='mx-3'>
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar