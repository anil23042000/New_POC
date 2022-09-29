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
const employeeschema = require('../model/employee_schema');
const projectdetails = require('../model/projects_details_schema');
const mongoose = require('mongoose');
const { Duplex } = require("stream");
const { projectsreso } = require("../controller/per_controller");
const Projects = mongoose.model('Projects');
const Employee = mongoose.model('Employee');
const ProjectDetails = mongoose.model('ProjectDetails');


// inserting Employee details
async function insertEmployee(req, res) {
    console.log(req.body)
    const employee = new Employee();
    employee.name = req.body.name;
    employee.ctc = req.body.ctc;
    employee.save((err, data) => {
        if (err) throw err
        console.log(data);
    });
    res.redirect("/api/listemployee")
}

//inserting Project details
async function insertProject(req, res) {
    const project = new Projects();
    console.log(req.body)
    console.log(req.body.sdate)
    project.projectName = req.body.pname;
    project.clientName = req.body.cname;
    project.projectStartDate = req.body.sdate;
    project.projectEndDate = req.body.edate;
    project.save((err, data) => {
        if (err) throw err
        console.log(data);
    })
    res.redirect("/api/listproject");
}

//inserting Resource details
async function insertResource(req, res) {

    console.log(req.body);
    const projectreso = new ProjectDetails();

    projectreso.projectID = req.body.pname;
    projectreso.employeeId = req.body.ename;
    projectreso.projectStartDate = req.body.sdate;
    projectreso.projectEndDate = req.body.edate;
    projectreso.role = req.body.role;
    projectreso.reportingManager = req.body.manager;

    projectreso.save((err, data) => {
        if (err) throw err
        console.log(data)
    })
    res.redirect("/api/listresource")
}

//finding all projects and displaying
async function listallProjects(req, res) {
    const docs = await Projects.find().lean();
    res.render("uploadfile/listprojects", { list: docs })
}

//finding all Employees and displaying
async function listallEmployee(req, res) {
    const docs = await Employee.find().lean();
    res.render("uploadfile/listemployees", { list: docs })
}

//finding all Resources and displaying
async function listallResource(req, res) {
    const resource = await ProjectDetails.find().lean();
    res.render("uploadfile/listresource", { list: resource })

}



//updating existing Employe
async function updateByempId(req, res) {
    console.log("updateByEmpid")
    console.log(req.body)
    console.log(req.body._id);
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        console.log(doc)
        if (!err) { res.redirect("/api/listemployee"); console.log("!err") }
        else {
            console.log("err")
            res.render("uploadfile/updateemp", {
                Employee: req.body
            });
        }
    });
}

//updating existing Projecy
async function updateByproId(req, res) {
    console.log("updateByproid")
    console.log(req.body)
    console.log(req.body._id)
    Projects.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            console.log(doc)
            res.redirect('/api/listproject');
        }
        else {
            res.render("uploadfile/updatepro", {
                viewTitle: 'Update Project',
                user: req.body
            });
        }
    });
}
//updating existing Resource
async function updateByresId(req, res) {
    console.log("updated Reso")
    console.log(req.body)
    console.log(req.body._id)
    ProjectDetails.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            console.log(doc)
            res.redirect('/api/listresource');
        }
        else {
            res.render("uploadfile/updatepro", {
                viewTitle: 'Update Project',
                user: req.body
            });
        }
    });
}

//finding single Employee and rendering for update
async function getOneEmp(req, res) {
    const employee = await Employee.findById(req.params.id).lean();
    res.render("uploadfile/updateemp",
        { Employee: employee }
    );

}

//finding single Project and rendering for update
async function getOnePro(req, res) {
    const project = await Projects.findById(req.params.id).lean();
    res.render("uploadfile/updatepro",
        { Project: project }
    );

}

//finding single Resource and rendering for update
async function getOneReso(req, res) {
    const project = await ProjectDetails.findById(req.params.id).lean();
    res.render("uploadfile/updatereso",
        { Project: project }
    );

}


//deleting single project
async function deleteByproId(req, res) {

    //here deleting 
    try {
        const project = await Projects.findByIdAndRemove(req.params.id);
        if (project) res.redirect("/api/listproject");
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}
//deleting single Employee
async function deleteByEmpId(req, res) {
    //here deleting 
    try {
        const project = await Employee.findByIdAndRemove(req.params.id);
        if (project) res.redirect("/api/listemployee");
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}
//deleting single Resource
async function deleteByresoId(req, res) {
    //here deleting 
    try {
        const project = await ProjectDetails.findByIdAndRemove(req.params.id);
        if (project) res.redirect("/api/listres");
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}


//here finding employees id and project id and passing ID's  for inserting resource
async function addtoproject(req, res) {
    const project = await Projects.find().lean();
    const employee = await Employee.find().lean();
    res.render("uploadfile/resource", {
        project: project,
        employee: employee
    })
}


// exporting all functions
module.exports = {
    getOneReso, updateByempId, deleteByresoId, insertResource, listallResource,
    addtoproject,
    insertEmployee,
    getOnePro,
    getOneEmp,
    updateByproId,
    updateByresId,
    insertProject,
    listallProjects,
    listallEmployee,
    deleteByproId,
    deleteByEmpId
}