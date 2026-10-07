const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/',async(req,res)=>{
    try {
        const [rows] = await db.query(`select * from tb_doc where id_doc desc`)
        res.json(rows[0])
    } catch (error) {
      console.error('error get user',error)
        res.status(500).json({message:'error get user'})
    }
})
module.exports = router