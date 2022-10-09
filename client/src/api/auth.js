import axios from 'axios'
axios.defaults.withCredentials = true



export async function onRegistration(registrationData) {
  return await axios.post(
    '/api/register',
    registrationData
  )
}


export async function onLogin(loginData) {
  return await axios.post('/api/login', loginData)
}



export async function onLogout() {
  return await axios.get('/api/logout')
}
