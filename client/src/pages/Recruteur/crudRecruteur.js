import React, { useState } from 'react'
import Layout from '../../components/layout'

export const CrudRecruteur = () => {

  const [jobTitle, setJobTitle] = useState("")
  const [jobPlace, setJobPlace] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [author, setAuthor] = useState("")
  
  

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)


  //const onChange = (e) => {
  //  setValues({ ...values, [e.target.name]: e.target.value })
  //}

  const onSubmitForm = async (e) => {
    e.preventDefault()

    try {
      const body = { jobTitle, jobPlace, jobDescription, author  };
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/"

      setSuccess('Vos informations ont bien été prises en compte.')
     
    } catch (error) {
      console.error(error.message)
      setError('Une erreur est survenue.')
    }
  }
  return (
    <div className='mt-5'>
      <div>
        <h2>Faire une annonce</h2>
        <form onSubmit={onSubmitForm} className='container mt-3'>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Intitulé du poste:
            </label>
            <input
              onChange={e => setJobTitle(e.target.value)}
              type='text'
              className='form-control'
              id='jobTitle'
              name='jobTitle'
              value={jobTitle}
              placeholder='Intitulé du poste'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Lieu du travail:
            </label>
            <input
              onChange={e => setJobPlace(e.target.value)}
              type='text'
              className='form-control'
              id='jobPlace'
              name='jobPlace'
              value={jobPlace}
              placeholder='Lieu du travail'
              required
              
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Description du poste:
            </label>
            <input
              onChange={e => setJobDescription(e.target.value)}
              type='text'
              className='form-control'
              id='jobDescription'
              name='jobDescription'
              value={jobDescription}
              placeholder='Description du poste'
              required
              
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Votre adresse mail:
            </label>
            <input
              onChange={e => setAuthor(e.target.value)}
              type='text'
              className='form-control'
              id='author'
              name='author'
              value={author}
              placeholder='Votre adresse mail'
              required
              
            />
            <p class="text-danger">Attention, vous recevrez les informations des utilisateurs ayant postulé à votre annonce sur cette adresse mail.</p>
          </div>
          <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>
          <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

          <button type='submit' className='btn btn-primary'>
            Soumettre
          </button>

          
        </form>  
      </div>
      
      
    </div>
  )
}

export default CrudRecruteur