var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const PDFDocument = require('pdfkit');
var fs = require('fs');
var archiver = require('archiver');
var docx = require("docx");
var moment = require('moment');


//////////////  =======> multer
// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/files',
    filename: function(req, file, cb){
        cb(null, req.user._id + 'bulk_letter_sample' + path.extname(file.originalname));
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

router.get("/bulkLetter", isLoggedIn, function (req, res) {
    res.render("./letters/bulk_letter.ejs");
});

router.get("/bulkLetter/download", isLoggedIn, function (req, res) {
    res.download('./public/files/bulk_letter_sample.xlsx');
});

router.post('/bulkLetter', upload.single('uploaded_file'), function (req, res) {
    var uploaded_file = req.file.uploaded_file;
    res.redirect('/letterTypes/bulkAttendance');
});

// Uploading files end here


// Excel to JSON

'use strict';
const excelToJson = require('convert-excel-to-json');



// Showing the results in JSON format

router.get("/bulkAttendance", isLoggedIn, async function (req, res) {
    const result = await excelToJson({
        sourceFile: './public/files/' + req.user._id + 'bulk_letter_sample.xlsx'
    });

    const newArrayOfObj = await result.Sheet1.map(({A: fatherName, B: studentName, C: shortAttendanceDate, D: Designation, E: Department, ...rest}) => ({
        fatherName,
        studentName,
        shortAttendanceDate,
        Designation,
        Department, ...rest
    }));

    const data = newArrayOfObj.slice(1);

    // console.log(newArrayOfObj);
    res.render("letters/short_attendance_letter", {result: data});
});

router.get("/download/shortAttendance", isLoggedIn, async function (req, res) {
    var archive = archiver('zip');

    const result = await excelToJson({
        sourceFile: './public/files/' + req.user._id + 'bulk_letter_sample.xlsx'
    });

    const newArrayOfObj = await result.Sheet1.map(({A: fatherName, B: studentName, C: shortAttendanceDate, D: Designation, E: Department, ...rest}) => ({
        fatherName,
        studentName,
        shortAttendanceDate,
        Designation,
        Department, ...rest
    }));

    const data = newArrayOfObj.slice(1);
    // console.log(data);

    data.forEach(function(foundUser, idx, array) {
        var downUser = foundUser;
        // var dateFormat = moment(downUser.date).format("Do MMM YYYY");
        var doc =new docx.Document();
        var to = new docx.TextRun("To").break().break();
        var fatherName = new docx.TextRun(`Mr. or Mrs. ${downUser.fatherName}`).bold().break().break();
        var studentName = new docx.TextRun(`F/o ${downUser.studentName}`).break().break();
        var subject = new docx.TextRun(`Sub: Short Attendance of your ward till ${moment(downUser.shortAttendanceDate).format('DD MMMM YYYY')}- reg.`).bold().break().break();
        var greeting = new docx.TextRun("Sir/Madam,").break().break();
        var paragraph = new docx.TextRun(`        This is to inform you that as per attendance till ${moment(downUser.shortAttendanceDate).format('DD MMMM YYYY')}, your ward is lagging behind the university minimum criteria of 75% attendance. As per GGSIP University Ordinance regarding Attendance`).break();
        var boldPara = new docx.TextRun(` a student shall be required to have a minimum attendance of 75% or more in the aggregate of all the courses taken together in a semester.`).bold();
        var otherPar = new docx.TextRun(`In line of GGSIP University Ordinance regarding Attendance you are advised to ensure that your ward must follow the attendance criteria failing which the student may be detained from appearing in End Semester Examinations.`);


        var paragraphOne = new docx.Paragraph().addRun(to).addRun(fatherName).addRun(studentName).addRun(subject).addRun(greeting);
        var para = new docx.Paragraph().spacing({line: 300}).justified().addRun(paragraph).addRun(boldPara).addRun(otherPar);
        var paragraphTwo = new docx.Paragraph('With Regards').heading3().right();
        var paragraphThree = new docx.Paragraph(`${downUser.Designation}, ${downUser.Department}`).heading4().right();


        doc.addParagraph(paragraphOne);
        doc.addParagraph(para);
        doc.addParagraph(paragraphTwo);
        doc.addParagraph(paragraphThree);
        var packer = new docx.Packer();
        packer.toBuffer(doc).then((buffer) => {
            archive.append(new Buffer(buffer), { name: `${downUser.fatherName}.docx` });
        });

    });
    archive.pipe(res);

    setTimeout(function () {
        archive.finalize(function(err, bytes) {
            if (err) {
                throw err;
            }

            console.log(bytes + ' total bytes');
        });
    }, 4000)
});



module.exports = router;
