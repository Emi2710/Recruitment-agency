const { Router } = require('express')
const router = Router()
const pool = require('../db')

//create recruiter info
router.post('/crudRecruteur', async(req, res) => {
    try {
        const { jobTitle, jobPlace, jobDescription } = req.body;
        const addPost = await pool.query("INSERT INTO crud_recruteur(job_title, job_place, job_description) VALUES($1, $2, $3) RETURNING *", 
        [jobTitle, jobPlace, jobDescription ]
        );

        res.json(addPost.rows[0])

    } catch (error) {
        console.error(error.message);
    }
})

//get info of all recruiters
router.get("/crudRecruteur", async(req, res) => {
    try {
        //const { value } = req.body.email;
        //const user = await pool.query('SELECT * from users WHERE email = $1', [value])
        const allPosts = await pool.query("SELECT * FROM crud_recruteur");
        res.json(allPosts.rows)
        
    } catch (error) {
        console.error(error.message)
    }
})

//get info of specific recruiter
router.get("/crudRecruteur/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const postId = await pool.query("SELECT * FROM crud_recruteur WHERE job_id = $1", [id])
        res.json(postId.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

//update info of recruiter
//router.put("/crud/:id", async(req, res) => {
  //try {
  //    const { id } = req.params;
  //    const { firm, address } = req.body;
  //    const updateAdress = await pool.query("UPDATE recr_inf SET firm = $1, address = $2 WHERE recr_inf_id = $3 ", [firm, address, id]);
  //    
  //    res.json("Adress was updated");
  //} catch (error) {
  //    console.error(error.message)
  //}
//})//




module.exports = router