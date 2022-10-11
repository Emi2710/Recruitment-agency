const { Router } = require('express')
const router = Router()
const pool = require('../db')

//create a post
router.post('/posts', async(req, res) => {
    try {
        const { jobTitle, jobPlace, jobDescription, author } = req.body;
        const addPost = await pool.query("INSERT INTO crud_recruteur(job_title, job_place, job_description, author) VALUES($1, $2, $3, $4) RETURNING *", 
        [jobTitle, jobPlace, jobDescription, author ]
        );

        res.json(addPost.rows[0])

    } catch (error) {
        console.error(error.message);
    }
})

//get all posts
router.get("/posts", async(req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM crud_recruteur");
        res.json(allPosts.rows)
        
    } catch (error) {
        console.error(error.message)
    }
})

//get info of specific post
router.get("/posts/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const postId = await pool.query("SELECT author FROM crud_recruteur WHERE job_id = $1", [id])
        res.json(postId.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

//get info of specific user
router.get("/protected/:email", async(req, res) => {
    try {
        const { email } = req.params;
        const getUser = await pool.query('SELECT * FROM users WHERE email = $1',
        [email])
        res.json(getUser.rows)
    } catch (error) {
        console.error(error.message);
    }
})

//update personal info of recruiter

router.put("/recruteur/:email", async(req, res) => {
  try {
      const { email } = req.params;
      const { address, firm  } = req.body;
      const updateInfo = await pool.query("UPDATE users SET address = $1, firm = $2 WHERE email = $3 ", [address, firm, email]);
      
      res.json("Vos informations ont bien été modifiées");
  } catch (error) {
      console.error(error.message)
  }
})

//update personal info of candidat

router.put("/candidat/:email", async(req, res) => {
  try {
      const { email } = req.params;
      const { name, resume  } = req.body;
      const updateInfo = await pool.query("UPDATE users SET name = $1, resume = $2 WHERE email = $3 ", [name, resume, email]);
      
      res.json("Vos informations ont bien été modifiées");
  } catch (error) {
      console.error(error.message)
  }
})


module.exports = router