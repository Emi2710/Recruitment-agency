import React, { useEffect, useState } from 'react'

const PostsList = () => {

    const [posts, setPosts] = useState([]);
    
    const getPosts = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/crudRecruteur")
            const jsonData = await response.json()

            setPosts(jsonData)
            console.log(jsonData)
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <div className='mt-5'>
            <div className='d-flex'>
            {posts.map(post => (
                <div key={post.job_id} className='m-3 bg-light text-dark p-3'>
                    <p>Poste : {post.job_title}</p>
                    <p>Lieu : {post.job_place}</p>
                    <p>Description : {post.job_description}</p>
                    <button className='btn btn-primary'>Postuler</button>
                </div>
            ))}    
            </div>
            
        </div>
    )
}

export default PostsList