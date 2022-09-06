import { useState } from 'react'
import { onRegistration } from '../api/auth'
import Layout from '../components/layout'

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    role: '',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({ email: '', password: '', role: '' })
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Inscription</h1>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Adresse mail
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='exemple@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Mot de passe
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='Mot de passe'
            required
          />

         
            <label htmlFor='role' className='form-label mt-3'>Vous êtes:</label>
            <select 
                    onChange={(e) => onChange(e)}
                    value={values.role}
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
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

        <button type='submit' className='btn btn-primary'>
          Soumettre
        </button>
      </form>
    </Layout>
  )
}

export default Register