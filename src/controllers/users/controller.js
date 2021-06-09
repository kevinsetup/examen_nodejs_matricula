const express = require('express');
const router = express();
const pool = require('../../database');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../../utils/jwtGenerator');
const  helper = require('../../lib/helpers')
const userController = {};

const {verifyToken, isComision , isProfessor} = require('../../middleware/authorization');

//Register

userController.register = async(req,res,next) =>{
    try {
        const {name, username , password} = req.body;

        const user = await pool.query('SELECT * FROM usertab WHERE username = $1', [username]);
        if(user.rows.length !== 0){
           return res.status(401).json({Error : 'Usuario existente'})
        }
        const passwordEncrypted = await helper.encryptPassword(password);

        const newUser = await pool.query('INSERT INTO usertab(name, username, password) values($1,$2,$3) RETURNING *'
        , [name, username, passwordEncrypted ]);

    

        //generating out jwt token
        const token = jwtGenerator(newUser.rows[0].iduser);

        res.json({token});


     


    } catch (error) {
        console.log(error);
      
    }
}

//login route
userController.login = async(req,res,next) =>{
    try {
        const {username, password} = req.body;
        
        const user = await pool.query('Select * from usertab where username = $1' , [username]);
        const role = await pool.query(`select  role_name from users_roles us join usertab u 
        on u.iduser = us.iduser join role r on r.role_id = us.role_id where username = $1` , [user.rows[0].username] )
       
        if(user.rows.length === 0){
            return res.json({error : 'Password or Email is incorrect'});
        }


        const validPassword = await helper.matchPassword(password, user.rows[0].password);
      
        if(!validPassword){
          return res.json({error : 'Password or Email is incorrect'});
        }
     


        const token = jwtGenerator(user.rows[0].iduser);

        res.json({ 
            user : [
               { name :user.rows[0].name  
            , username :  user.rows[0].username 
            , rol : role.rows[0].role_name}
          ]
            , 
               accesToken : token
               }); 





  } catch (error) {
      console.log(error);
  }
}


router.get('/verify', verifyToken,  async(req,res,next) =>{
    try {
        res.json(true);
    } catch (error) {
        
    }
})
router.get('/admin', verifyToken, isComision ,async(req,res,next) =>{
    try {
        res.json({Bienvenida : 'Bienvenida comisión'});
    } catch (error) {
        
    }
})











module.exports = 
    userController
;