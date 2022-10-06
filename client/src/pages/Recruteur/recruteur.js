import React, { useState } from 'react'
import Layout from '../../components/layout'
import CrudRecruteur from './crudRecruteur'
import ListUserInfo from './listUserInfo'

export const Recruteur = () => {

  return (
    <Layout>
      <h1 className='text-center mt-5'>Recruteur</h1>
      <ListUserInfo />
      <CrudRecruteur />
      
    </Layout>
  )
}

export default Recruteur