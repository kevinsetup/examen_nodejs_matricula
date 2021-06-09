const express = require('express');
const router = express.Router();
const user = require('../controllers/users/routes');
const matricula = require('../controllers/matricula/routes');
const detalle = require('../controllers/detalle/routes');
router.use('/', user);
router.use('/', matricula);
router.use('/', detalle);

module.exports = router;