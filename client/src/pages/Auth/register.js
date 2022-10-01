import { useState } from 'react'
import { onRegistration } from '../../api/auth'
import Layout from '../../components/layout'

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    role: '',
  })
  const [firm, setFirm] = useState("")
  const [address, setAddress] = useState("")
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

      const body = { firm, address };
      const response = await fetch("http://localhost:8000/api/recrInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/"
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
            placeholder='Adresse mail'
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
            <div className='mt-3'>
              {values.role === 'candidat' && 
                <>
                <h3>candidat</h3>
                </>
              }
              {values.role === 'recruteur' && 
                <>
                <div className='mt-3'>
                  <label htmlFor='email' className='form-label'>
                    Le nom de votre entreprise:
                  </label>
                  <input
                    onChange={e => setFirm(e.target.value)}
                    type='text'
                    className='form-control'
                    id='firm'
                    name='firm'
                    value={firm}
                    placeholder="Nom de l'entreprise"
                    
                  />  
                </div>
                <div className='mt-3'>
                  <label htmlFor='email' className='form-label'>
                    L'adresse de votre entreprise:
                  </label>
                  <input
                    onChange={e => setAddress(e.target.value)}
                    type='text'
                    className='form-control'
                    id='address'
                    name='address'
                    value={address}
                    placeholder="Adresse de l'entreprise"
                    
                  />  
                </div>
                
                </>
              }  
            </div>

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