const express = require('express');
const router = express.Router();
const matriculaController = require('../matricula/controller');
const {verifyToken, isComision , isProfessor} = require('../../middleware/authorization');
router.get('/api/v1/matricula', verifyToken, isComision,  matriculaController.getAll );
router.post('/api/v1/matricula', verifyToken, isComision, matriculaController.add);
router.post('/api/v1/matricula/:id', verifyToken, isComision, matriculaController.getOne);
router.post('/api/v1/matricula/:id', verifyToken, isComision, matriculaController.edit);
router.post('/api/v1/matricula/:id',  verifyToken, isComision, matriculaController.delete);

module.exports = router;