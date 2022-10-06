import React from 'react'
import Layout from '../../components/layout'
import ListUserInfo from './listUserInfo'
import PostsList from './postsList'

const Candidat = () => {
  return (
    <Layout>
      <h1 className='text-center mt-5'>Candidat</h1>
      <ListUserInfo />
      <PostsList />
      
    </Layout>
  )
}

export default Candidat

