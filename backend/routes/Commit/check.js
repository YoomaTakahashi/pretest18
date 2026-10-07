const express =require('express')
const db =require('../../db')
const router = express.Router()
const {requireRole,verifyToken} = require('../../middleware/authmiddleware')

router.get('/',verifyToken,requireRole('กรรมการประเมิน'),async(req,res)=>{
    try {
        const id_member =req.user.id_member
    } catch (error) {
        
    }
})