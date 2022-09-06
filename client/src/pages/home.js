import React from 'react'
import Candidat from './candidat'
import Recruteur from './recruteur'

const Home = () => {
    const role = localStorage.getItem('role')
  return (
    <div>
        {role==='candidat' && <><Candidat /></>}
        {role==='recruteur' && <><Recruteur /></>}
    </div>
  )
}

export default Home