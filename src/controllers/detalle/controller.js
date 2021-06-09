const express = require('express');
const router = express();
const pool = require('../../database');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../../utils/jwtGenerator');
const  helper = require('../../lib/helpers')
const detalleController = {};
const {verifyToken, isComision , isProfessor} = require('../../middleware/authorization');

detalleController.getReport = async(req,res,next) =>{
    try {
        const getDetalle = await pool.query(`select a.nombres nombres, a.apellidos apellidos, a.dni dni, a.direccion direccion, e.nombre escuela, c.nombre Curso, c.creditos creditos, c.horas horas , m.fecha fecha, m.ciclo ciclo  from detalle d
        inner join matricula
        m on m.idmatricula = d.idmatricula
        inner join escuela e on e.idescuela = m.idescuela
        inner join alumno a on a.idalumno = m.idalumno
        inner join curso c on c.idcurso = d.idcurso`)
    return res.status(200).json((getDetalle.rows));  
    } catch (error) {
        console.log(error)
    }
}



module.exports = detalleController;



