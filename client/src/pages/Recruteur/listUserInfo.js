import React, { useEffect, useState } from 'react'

const ListUserInfo = () => {

    const [recrInfo, setRecrInfo] = useState([]);
    
    const getRecrInfo = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/recrInfo")
            const jsonData = await response.json()

            setRecrInfo(jsonData)
            console.log(jsonData)
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getRecrInfo();
    }, []);
    
    return (
        <div className='mt-3'>
            <h2>Mes infos :</h2>
            {recrInfo.map(recrInfo => (
                <div key={recrInfo.recr_inf_id}>
                <p>Nom de l'entreprise : {recrInfo.firm}</p>
                <p>Adresse de l'entreprise : {recrInfo.address}</p>
                </div>
            ))}
        </div>
    )
}

export default ListUserInfo