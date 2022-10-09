import React, { useState } from 'react'

const EditUserInfo = ({ userData }) => {
    const [name, setName] = useState(userData.name);
    const [resume, setResume] = useState(userData.resume);

    const updateInfo = async e => {
    e.preventDefault();
    try {
      const body = { name, resume };
      const response = await fetch(
        `/api/candidat/${localStorage.getItem("email")}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
        <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Modifer les informations
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modifier vos informations</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


                <input type='text' className='form-control' placeholder="Votre nom" value={name} onChange={e => setName(e.target.value)}></input>
                <input type='text' className='form-control mt-2' placeholder="Lien vers le fichier de votre CV" value={resume} onChange={e => setResume(e.target.value)}></input>

                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={e => updateInfo(e)}>Enregistrer</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default EditUserInfo