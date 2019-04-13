var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload')

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

// Uploading files

router.get("/bulkVisitingCards", isLoggedIn, function (req, res) {
    res.render("./cards/bulkVisitingCards");
});

router.post('/bulkVisitingCards', function (req, res) {

    // console.log(req.files);
    // console.log(req.files.uploaded_file); // the uploaded file object

    var uploaded_file = req.files.uploaded_file;
    // var fileName = req.body.fileName;
    // console.log(fileName)
    // uploaded_file.mv('public/'+ fileName +'.xlsx');

    uploaded_file.mv('public/files/' + req.user._id + 'sample' + '.xlsx')
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

    // console.log(newArrayOfObj);
    res.render("cards/visiting_cards", {result: newArrayOfObj});
});

module.exports = router;
