var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const PDFDocument = require('pdfkit');
var fs = require('fs');
var archiver = require('archiver');


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

router.get("/download/first", isLoggedIn, async function (req, res) {
    var archive = archiver('zip');

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
// Create a document
    data.forEach(function (user) {
        const doc = new PDFDocument({
            layout: 'landscape',
            size: [180, 270],
            margins: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }

        });


        doc.fontSize(16)
            .fillColor('#35567B')
            .text(`${user.organization}`, 10, 20)
            .moveDown()
            .moveDown()
            .fontSize(14)
            .text(`${user.name}`, { align: 'right' })
            .fontSize(10)
            .fillColor('black')
            .text(`${user.designation}`, { align: 'right' })
            .text(`${user.contact_number}`, { align: 'right' });


        doc.lineCap('round')
            .moveTo(10, 120)
            .lineTo(260, 120)
            .lineWidth(3)
            .stroke();

        doc.fontSize(12)
            .moveDown()
            .text(`${user.address}`, { align: 'left' } )

        // doc.pipe(fs.createWriteStream('output1.pdf'));
        archive
            .append(doc, { name: `${user.name}.pdf` });
        doc.end();
    });

    archive.pipe(res);
    archive.finalize(function(err, bytes) {
        if (err) {
            throw err;
        }

        console.log(bytes + ' total bytes');
    });
});

router.get("/download/second", isLoggedIn, async function (req, res) {
    var archive = archiver('zip');

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
// Create a document
    data.forEach(function (user) {
        const doc = new PDFDocument({
            layout: 'landscape',
            size: [180, 270],
            margins: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }

        });

        doc.lineCap('round')
            .moveTo(10, 0)
            .lineTo(10, 180)
            .lineWidth(25)
            .fillAndStroke("#4B9EDA", "#4B9EDA");

        doc.fontSize(16)
            .fillColor('#4B9EDA')
            .text(`${user.organization}`, 30, 25);


        doc.lineCap('round')
            .moveTo(30, 50)
            .lineTo(260, 50)
            .lineWidth(3)
            .stroke();

        doc.fontSize(14)
            .moveDown()
            .fillColor('black')
            .text(`${user.name}`, { align: 'left' })
            .fontSize(12)
            .text(`${user.designation}`, { align: 'left' })
            .moveDown()
            .moveDown()
            .text(`${user.contact_number}`, { align: 'left' })
            .text(`${user.address}`, { align: 'left' } );

        archive
            .append(doc, { name: `${user.name}.pdf` });
        doc.end();
    });

    archive.pipe(res);
    archive.finalize(function(err, bytes) {
        if (err) {
            throw err;
        }

        console.log(bytes + ' total bytes');
    });
});

module.exports = router;
