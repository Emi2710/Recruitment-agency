import Candidat from './candidat'
import Recruteur from './recruteur'
const Home = () => {

  const role = localStorage.getItem('role')

  if (role === 'candidat') {
    return <><Candidat /></>
  } else if(role === 'recruteur') {
    return <><Recruteur /></>
  } 
  
}

export default Home