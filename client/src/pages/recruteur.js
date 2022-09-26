import React, { useState } from 'react'
import Layout from '../components/layout'
import { recrInfo } from '../api/auth'

export const Recruteur = () => {

  const [firm, setFirm] = useState("")
  const [address, setAddress] = useState("")
  const [success, setSuccess] = useState(false)

  //const onChange = (e) => {
  //  setValues({ ...values, [e.target.name]: e.target.value })
  //}

  const onSubmitForm = async (e) => {
    e.preventDefault()

    try {
      const body = { firm, address };
      const response = await fetch("http://localhost:8000/api/recrInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      console.log(response)
     
    } catch (error) {
      console.log('Erreur onSubmit recruteur info personelles')
      
    }
  }
  return (
    <Layout>
      <h1>Recruteur</h1>
      <form onSubmit={onSubmitForm} className='container mt-3'>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Le nom de votre entreprise :
          </label>
          <input
            onChange={e => setFirm(e.target.value)}
            type='text'
            className='form-control'
            id='firm'
            name='firm'
            value={firm}
            placeholder='Exemple : Hôtel Méditeranéen'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            L'adresse de votre entreprise
          </label>
          <input
            onChange={e => setAddress(e.target.value)}
            type='text'
            className='form-control'
            id='adress'
            name='adress'
            value={address}
            placeholder='15 rue de la Croix, Nice 06000'
            
          />
        </div>
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

        <button type='submit' className='btn btn-primary'>
          Soumettre
        </button>

        
      </form>
    </Layout>
  )
}

export default Recruteur