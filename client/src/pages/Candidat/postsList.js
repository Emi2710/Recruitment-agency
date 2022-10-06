import React, { useEffect, useState } from 'react'
import Postuler from './postuler';

const PostsList = () => {

    const [posts, setPosts] = useState([]);
    
    const getPosts = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/posts")
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
            <h2>Annonces :</h2>
            <div className='d-flex flex-wrap'>
            {posts.map(post => (
                <div key={post.job_id} className='m-3 bg-light text-dark p-3'>
                    <p>Poste : {post.job_title}</p>
                    <p>Lieu : {post.job_place}</p>
                    <p>Description : {post.job_description}</p>
                    <Postuler getPosts={getPosts}/>
                    
                </div>
            ))}    
            </div>
            
        </div>
    )
}

export default PostsList