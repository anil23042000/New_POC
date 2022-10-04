const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');
var mammoth = require("mammoth");
var multer = require('multer');
const xlsxFile = require('read-excel-file/node');
const projectSchema = require('../model/project_schema');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const service = require('../service/per_service')

//file  controller 


//rendering to hbs file
async function getData(req, res) {
    res.render("uploadFile/menu", {
        viewTitle: "Insert Users"
    });
}

//posting employee data 
async function uploadEmployee(req, res, next) {
    service.insertEmployee(req, res);
}

//posting project data
async function uploadProject(req, res, next) {
    service.insertProject(req, res);
}

//posting Resource data
async function uploadResource(req, res, next) {
    service.insertResource(req, res);
}

//posting file 
async function uploadBill(req, res, next) {
    service.insertFile(req, res);
}



//listing out all project
async function listProjects(req, res, next) {
    service.listallProjects(req, res);
}

//listing out all employee
async function listEmployee(req, res, next) {
    service.listallEmployee(req, res);
}

//listing out all Resource
async function listResource(req, res, next) {
    service.listallResource(req, res);
}


//listing file
async function listFile(req, res, next) {
    service.listallFile(req, res);
}

//deleting one Project
async function deleteoneProject(req, res, next) {
    service.deleteByproId(req, res);
}

//deleting one Employee
async function deleteoneEmployee(req, res, next) {
    service.deleteByEmpId(req, res);
}

//deleting one Resource
async function deleteoneResource(req, res, next) {
    service.deleteByresoId(req, res);
}

//collet and posting data for update Proect
async function updateProject(req, res, next) {
    console.log("updateonepro")
    service.updateByproId(req, res);
}
//collet and posting data for update Employee
async function updateEmployee(req, res, next) {
    console.log("updateemp")
    service.updateByempId(req, res);
}
//collet and posting data for update Resource
async function updateResource(req, res, next) {
    console.log("updateemp")
    service.updateByresId(req, res);
}



//finding data for update
async function getEmployee(req, res, next) {
    console.log("updateemp")
    service.getOneEmp(req, res);
}
//finding data for update
async function getProject(req, res, next) {
    service.getOnePro(req, res);
}
//finding data for update
async function getResource(req, res, next) {
    service.getOneReso(req, res);
}




//here redirecting to other page to add new Resource
async function projectsreso(req, res, next) {
    service.addtoproject(req, res);
}


async function file(req,res,next){
    service.addfile(req,res);
}

//reading one file
async function readData(req, res, next) {
    service.readOneFile(req, res);
}

//more
async function moreDetails(req,res,next){
    service.giveMoreInfo(req, res);
}




//calling service file for deleting single project
async function deletesingle(req, res, next) {
    service.deleteByid(req, res);
}

//calling service file for getting single file info
async function updateFile(req, res, next) {
    service.getOneFile(req, res);
}

//calling service file for updating
async function updateOneFile(req, res, next) {
    service.replaceFile(req, res);
}

module.exports = {
    getResource, updateProject,uploadBill,listFile,file,readData,moreDetails,deletesingle,updateFile,updateOneFile,
    deleteoneResource,
    getData,
    getProject,
    projectsreso,
    getEmployee,
    updateEmployee,
    uploadEmployee,
    updateResource,
    uploadProject,
    listProjects,
    listEmployee,
    deleteoneProject,
    deleteoneEmployee,
    listResource,
    uploadResource
}