var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');


//////////////  =======> multer
// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/files',
    filename: function(req, file, cb){
        cb(null, req.user._id + 'sample' + path.extname(file.originalname));
    }
})

// Init Upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    // console.log(file);
    const filetypes = /xlsx/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());


    if (extname) {
        return cb(null, true);
    } else {
        cb('Error: Excel file Only');
    }

}

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

// Uploading files

router.get("/bulkVisitingCards", isLoggedIn, function (req, res) {
    res.render("./cards/bulkVisitingCards");
});

router.get("/bulkVisitingCards/download", isLoggedIn, function (req, res) {
    res.download('./public/files/sample.xlsx');
});

router.post('/bulkVisitingCards', upload.single('uploaded_file'), function (req, res) {

    // console.log(req.files);
    // console.log("----",req.file); // the uploaded file object

    var uploaded_file = req.file.uploaded_file;
    // var fileName = req.body.fileName;
    // console.log(fileName)
    // uploaded_file.mv('public/'+ fileName +'.xlsx');
    res.redirect('/otherformats/visiting_cards');
});

// Uploading files end here


// Excel to JSON

'use strict';
const excelToJson = require('convert-excel-to-json');

// const result = excelToJson({
//     sourceFile: './public/sample.xlsx'
// });

// End here (Excel to JSON)


// Showing the results in JSON format

router.get("/visiting_cards", isLoggedIn, async function (req, res) {
    const result = await excelToJson({
        sourceFile: './public/files/' + req.user._id + 'sample.xlsx'
    });

    const newArrayOfObj = result.Sheet1.map(({A: name, B: organization, C: designation, D: contact_number, E: address, ...rest}) => ({
        name,
        organization,
        designation,
        contact_number,
        address, ...rest
    }));

    const data = newArrayOfObj.slice(1);

    // console.log(newArrayOfObj);
    res.render("cards/visiting_cards", {result: data});
});

module.exports = router;
