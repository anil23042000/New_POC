const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const router = express.Router();
const controller = require("../controller/per_controller")
const projectdetails = require('../model/project_resource_schema');

var mammoth = require("mammoth");
var multer = require('multer');
const fs = require('fs');
const path = require('path');
const xlsxFile = require('read-excel-file/node');
const { table } = require("console");

//creating storage
const storageEngin = multer.diskStorage({
    //giving destination for strong file
    destination: function (request, file, callback) {
        console.log("hi")
        callback(null, "./uploads/")
    },

    //giving filename
    filename: function (request, file, callback) {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storageEngin })



router.get("/", controller.getData);

//rendering for inserting employee page
router.get("/employee", (req, res) => {
    res.render("uploadfile/addemployee")
});
//rendering for inserting for project 
router.get("/project", (req, res) => {
    res.render("uploadfile/addproject")
    //res.render("uploadfile/addproject");
});
//rendering for uploading new file
router.get("/addbill",controller.file)
//rendering for inserting for resource
router.get("/resource", controller.projectsreso);

//colleteting inputs for inserting in all 3 sheets
router.post("/postemployee", controller.uploadEmployee);
router.post("/postproject", controller.uploadProject);
router.post("/postresource", controller.uploadResource);

router.post("/postbill", upload.single("fileName"), controller.uploadBill);

//list all data from each table from database
router.get("/listproject", controller.listProjects)
router.get("/listemployee", controller.listEmployee)
router.get("/listresource", controller.listResource);
router.get("/listfile", controller.listFile);

//finding single data for updating 
router.get("/getproject/:id", controller.getProject)
router.get("/getemployee/:id", controller.getEmployee);
router.get("/getresource/:id", controller.getResource)

//collecting data for updating from post method
router.post("/updateproject", controller.updateProject);
router.post("/updateemployee", controller.updateEmployee);
router.post("/updateresource", controller.updateResource);

//deleting  
router.get("/deletepro/:id", controller.deleteoneProject);
router.get("/deleteemp/:id", controller.deleteoneEmployee);
router.get("/deletereso/:id", controller.deleteoneResource);


//routing get method for reading one file 
router.get("/fileread/:id", controller.readData);

//giving more details
router.get("/details/:id", controller.moreDetails);


//routing get method for deleting single fileinfo
router.get("/filedelete/:id", controller.deletesingle);

//routing get method for getting one file for updateing
router.get("/fileupdate/:id", controller.updateFile);


//routing post method for updating fileinfo and storing new file to folder 
router.post("/updatefile", upload.single("fileName"), controller.updateOneFile);

module.exports = router;