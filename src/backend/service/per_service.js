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
const projectdetails = require('../model/project_resource_schema');
const fileSchema = require('../model/file_schema');


const mongoose = require('mongoose');
const { Duplex } = require("stream");
const { projectsreso } = require("../controller/per_controller");
const Projects = mongoose.model('Project');
const Employee = mongoose.model('Employee');
const ProjectResource = mongoose.model('Project_Resource');
const File = mongoose.model('File');


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
    const projectreso = new ProjectResource();
    const project = await Projects.findById(req.body.pname).lean();
    console.log(project)
    const employee = await Employee.findById(req.body.ename).lean();
    projectreso.projectName = project.projectName;
    projectreso.employeeName = employee.name;
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

//inserting file 
async function insertFile(req, res) {

    const file = new File();
    console.log(req.body)
    console.log(req.file)
    file.filePath = req.file.path;
    file.fileName = req.file.filename;
    file.employeeId = req.body.ename;
    file.save((err, data) => {
        if (err) throw err
        console.log(data);
    })
    res.redirect("/api/listfile");
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
    const resource = await ProjectResource.find().lean();
    res.render("uploadfile/listresource", { list: resource })
}


//finding all file and displaying
async function listallFile(req, res) {
    const file = await File.find().lean();
    res.render("uploadfile/listfile", { list: file })
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
    ProjectResource.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
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
    const project = await ProjectResource.findById(req.params.id).lean();
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
        const project = await ProjectResource.findByIdAndRemove(req.params.id);
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


//here finding employees id and  passing ID's  for inserting resource
async function addfile(req, res) {
    const employee = await Employee.find().lean();
    res.render("uploadfile/addbill", {
        employee: employee
    })
}


//reading single file from read-excel-file/node
async function readOneFile(req, res) {

    //finding data in mongoodb 
    console.log(req.params.id)
    const file = await File.findOne({ "_id": req.params.id }).lean();
    // console.log(projects.fileName);
    // console.log(projects.filePath);

    console.log(file)
    //here reading data after find out 
    xlsxFile(file.filePath).then((file) => {
        console.log(file)
        res.render('uploadFile/readfile', { list: file });
    })
}

async function giveMoreInfo(req, res) {
    console.log(req.params.id);
    const details = await ProjectResource.find({ "projectID": req.params.id }).lean();
    console.log(details)

    res.render("uploadfile/moredetails", { list: details });
}



//Deleting project info from database
async function deleteByid(req, res) {

    //this function will delete file in repo 
    unlinkFile(req.params.id);

    //here deleting 
    try {
        const file = await File.findByIdAndRemove(req.params.id);
        if (file) res.redirect("/api/listfile");
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}


//this function will unlike the file from folder using unlink function
async function unlinkFile(id) {
    console.log(id);
    //finding file details for getting file __dir
    const file = await File.findOne({ "_id": id });

    // const projects = await Projects.findOne({ "_id": fileId }).exec();
    console.log(file)
    //unlinking
    fs.unlink(file.filePath, (err) => {
        if (err) throw err
        console.log("Success")
    })
}

// here finding data and rendered for updating 
async function getOneFile(req, res) {
    const fileinfo = await File.findById(req.params.id).lean();
    console.log(fileinfo.employeeId)
    res.render("uploadfile/updatefile",
        { File: fileinfo }   
    );
    //here unlinking the file bcoz we will upload new updated file 
   unlinkFile(req.params.id);
}


// here updating or replacing the project info and file
async function replaceFile(req, res) {
    //collecting info for updating 
    const fileInfo = {
        filePath: req.file.path,
        fileName: req.file.filename,
        employeeId:req.body.employeeId
    }

    //updating old file and info to new info and file
    File.findOneAndUpdate({ _id: req.body._id }, fileInfo, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/api/listfile'); }
        else {
            res.render("uploadfile/addbill", {
                viewTitle: 'Update User',
                user: req.body
            });
        }
    });


}


// exporting all functions
module.exports = {
    getOneReso, updateByempId, deleteByresoId, insertResource, listallResource, insertFile, listallFile, addfile, readOneFile,
    addtoproject, giveMoreInfo,deleteByid,getOneFile,replaceFile,
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