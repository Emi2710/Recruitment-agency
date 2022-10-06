import React, { useState, useEffect } from 'react'

const Postuler = ({getPosts}) => {

    const [email, setEmail] = useState("");

    const getPostId = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/posts/${getPosts.job_id}`)
      const jsonData = await response.json()

      console.log(jsonData)

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
        getPostId();
    }, []);


    /*function sendMail() {
    var link = `mailto:(${email})`
             + "&subject=" + encodeURIComponent("This is my subject")
             + "&body=" + encodeURIComponent("wesh alors")
             
             //"&body=" + encodeURIComponent(document.getElementById('myText').value)
    ;
    
    window.location.href = link;
}*/

  return (
    <div id={`id${getPosts.job_id}`} onClick={() => setEmail(getPosts.author)}>
        <button className='btn btn-primary'
                onClick={getPostId()}
                data-target={`#id${getPosts.job_id}`}
        >
            Postuler
        </button>
    </div>
  )
}

export default Postuler