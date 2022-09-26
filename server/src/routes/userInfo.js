const { Router } = require('express')
const router = Router()
const pool = require('../db')

//create recruiter info
router.post('/recrInfo', async(req, res) => {
    try {
        const { firm, address } = req.body;
        const addRecrInfo = await pool.query("INSERT INTO recr_inf(firm, address) VALUES($1, $2) RETURNING *", 
        [firm, address]
        );

        res.json(addRecrInfo.rows[0])

    } catch (error) {
        console.error(error.message);
    }
})

//get info of all recruiters
router.get("/recrInfo", async(req, res) => {
    try {
        const allRecrInfo = await pool.query("SELECT * FROM recr_inf");
        res.json(allRecrInfo.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get info of specific recruiter
router.get("/recrInfo/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const recrInfoId = await pool.query("SELECT * FROM recr_inf WHERE recr_inf_id = $1", [id])
        res.json(recrInfoId.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

//update info of recruiter
router.put("/recrInfo/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { firm, address } = req.body;
        const updateAdress = await pool.query("UPDATE recr_inf SET firm = $1, address = $2 WHERE recr_inf_id = $3 ", [firm, address, id]);
        
        res.json("Adress was updated");
    } catch (error) {
        console.error(error.message)
    }
})




module.exports = router