import { useState, useEffect } from 'react'
import { onLogin } from '../../api/auth'
import Layout from '../../components/layout'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux/slices/authSlice'


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  

  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {

      await onLogin({email, password, role})

      dispatch(authenticateUser())
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('role', role)
      localStorage.setItem('email', email)


    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }

  
  return (
    <Layout>
      <form onSubmit={onSubmit} className='container mt-3'>
        <h1>Connexion</h1>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Adresse mail
          </label>
          <input
            onChange={e => setEmail(e.target.value)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            placeholder='exemple@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Mot de passe
          </label>
          <input
            onChange={e => setPassword(e.target.value)}
            type='password'
            value={password}
            className='form-control'
            id='password'
            name='password'
            placeholder='Mot de passe'
            required
          />

          <label htmlFor='role' className='form-label mt-3'>Je suis:</label>
            <select 
                    
                    onChange={e => setRole(e.target.value)}
                    value={role}
                    name="role"
                    id="role" 
                    className='form-select'
                    required
            >
                <option value="">--Choisissez--</option>
                <option value="recruteur">Recruteur</option>
                <option value="candidat">Candidat</option>
            </select>
        </div>

        
        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

        <button type='submit' className='btn btn-primary'>
          Soumettre
        </button>  
      </form>
    </Layout>
  )
}

export default Login