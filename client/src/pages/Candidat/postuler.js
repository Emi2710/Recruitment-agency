import React, { useState, useEffect } from 'react'

const Postuler = ({post}) => {

  const [jobId, setJobId] = useState(post.job_id);
  const [author, setAuthor] = useState(post.author);

  const getAuthor = async () => {
        try {
            const response = await fetch(`/api/posts/${jobId}`)
            const jsonData = await response.json()

            setAuthor(jsonData.author);
            
        } catch (error) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        getAuthor();
    }, []);

    



  return (
    <div>
      
      <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${post.job_id}`}>
        Postuler
        </button>

        <div className="modal fade" id={`id${post.job_id}`} onClick={() => setJobId(post.job_id)} tabIndex="-1" aria-labelledby="postuler" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Postuler à une annonce</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>Vous êtes sur le point de postuler à cette annonce.</p> 
                
            </div>
            <div className="modal-footer">
                <form method='post'>
                    <a href={`mailto:${author}`}>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Confirmer</button>    
                    </a>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Annuler</button>    
                </form>
                
            </div>
            </div>
        </div>
        </div>
    </div>

    

    </div>
  )
}

export default Postuler