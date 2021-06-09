const express = require('express');
const router = express.Router();
const userController = require('../users/controller');
const {verifyToken, isComision , isProfessor} = require('../../middleware/authorization');
router.post('/auth/register', userController.register );
router.post('/auth/login', userController.login );


//router.get('/api/v1/product/:id ' , verifyToken, isComision, productController.getProduct);
//router.post('/api/v1/product', verifyToken, isComision , productController.addProduct);
//router.put('/api/v1/product/:id', verifyToken, isComision , productController.editProduct);
//router.delete('/api/v1/product/:id', verifyToken, isComision , productController.deleteProduct);

module.exports = router;