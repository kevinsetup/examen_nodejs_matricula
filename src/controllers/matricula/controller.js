const express = require('express');
const router = express();
const pool = require('../../database');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../../utils/jwtGenerator');
const  helper = require('../../lib/helpers')
const matriculaController = {};


matriculaController.getAll = async(req,res,next) =>{
    try {
        const getMatricula= await pool.query("select * from matricula")
    return res.status(200).json((getMatricula.rows));  
    } catch (error) {
        console.log(error)
    }
}

matriculaController.getOne  = async(req,res,next) =>{
    try {
        const {id} = req.params;
        const getMatricula = await pool.query("select * from matricula where idmatricula = $1", [id])
        return res.status(200).json(getMatricula.rows);
     
    } catch (error) {
        console.log(error)
    }
}

matriculaController.add  = async(req,res,next) =>{
    try {
        const { fecha , ciclo, idusuario, idescuela, idalumno} = req.body;
        await pool.query("insert into matricula(fecha, ciclo, idusuario,idescuela,idalumno) values($1,$2, $3, $4, $5)",[fecha, ciclo, idusuario, idescuela, idalumno ] )
        return res.status(200).json({
            message : 'matricula created successfully'
        });
    
    } catch (error) {
        console.log(error)
    }
}

matriculaController.edit  = async(req,res,next) =>{
    try {
        const {id} = req.params;
        const {fecha , ciclo, idescuela} = req.body
        await pool.query("update matricula set fecha = $1, ciclo = $2, idescuela = $3 where idmatricula = $4", [fecha, ciclo, idescuela, id])
        return res.status(200).json({
            message : 'matricula updated successfully'
        });
    
        } catch (error) {
            console.log(error)
    }
}

matriculaController.delete  = async(req,res,next) =>{
    try {
        const {id} = req.params;
        await pool.query("delete from matricula where idmatricula = $1 ", [id])
        return res.status(200).json({
            message : 'matricula successfully removed'
        });  
    } catch (error) {
        console.log(error)
    }
}

module.exports = matriculaController;



