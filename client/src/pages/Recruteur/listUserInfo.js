import React, { useEffect, useState } from 'react';
import EditUserInfo from './EditUserInfo';

const ListUserInfo = () => {

  const [userData, setUserData] = useState([]);
    
    const getUser = async () => {
        try {
            const response = await fetch(`/api/protected/${localStorage.getItem("email")}`)
            const jsonData = await response.json()

            setUserData(jsonData)
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    
    
    return (
        <div className='mt-5'>
            <h2>Mes infos :</h2>
            {userData.map(user => (
                <div key={user.user_id} className='m-3 bg-light text-dark p-3'>
                    <p>Role : {user.role}</p>
                    <p>Email : {user.email}</p>
                    <p>Nom de l'entreprise: {user.firm}</p>
                    <p>Adresse: {user.address}</p>
                    <EditUserInfo userData={userData} />
                    
                </div>
            ))}
        </div>
    )
}

export default ListUserInfo