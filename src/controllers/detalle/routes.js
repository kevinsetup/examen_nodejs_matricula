const express = require('express');
const router = express.Router();
const detalleController = require('../detalle/controller');
const {verifyToken, isComision , isProfessor} = require('../../middleware/authorization');
router.get('/api/v1/detalle', verifyToken, isComision, detalleController.getReport );
//router.post('/auth/login', userController.login );


//router.get('/api/v1/product/:id ' , verifyToken, isComision, productController.getProduct);
//router.post('/api/v1/product', verifyToken, isComision , productController.addProduct);
//router.put('/api/v1/product/:id', verifyToken, isComision , productController.editProduct);
//router.delete('/api/v1/product/:id', verifyToken, isComision , productController.deleteProduct);

module.exports = router;