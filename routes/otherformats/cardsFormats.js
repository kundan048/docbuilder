var express = require('express');
var router = express.Router();
const multer = require('multer');
require('dotenv').config();
const cloudinary = require('cloudinary');
const path = require('path');

require('../../handlers/cloudinary');

// Load Models
var User = require('../../models/user');
var StudentCard = require('../../models/cards/student_card');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

// Load Transformer
var {filterData} = require('../../transformer/cards/cards_transformer');

//////////////  =======> multer
// Set Storage Engine
const storage = multer.diskStorage({
    // destination: './public/uploads/',
    // filename: function(req, file, cb){
    //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // }
})

// Init Upload
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1000000
    },
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).array('photos',2);

// Check file type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    }else {
        cb('Error: Images Only');
    }

}

///////////// =====>

router.get("/cardsFormats", isLoggedIn, function(req, res){
	res.render('cards_formats');
});

router.get("/cards", isLoggedIn, function(req, res) {
	StudentCard.findOne({ "createdby": req.user._id}).sort({ _id: -1 }).exec(function(err, card) {
		if(err){
			console.log(err);
			res.redirect("/otherFormats/cardsFormats");
		} else {
			if(card) {
				res.render("cards", {cards : card});
			} else {
				res.redirect("/otherFormats/cardsFormats");
			}
		}
	});
});

router.post("/cardsFormats", isLoggedIn, function(req, res){
	

	upload(req, res, async function (err) {
	    if (err instanceof multer.MulterError) {
	      // A Multer error occurred when uploading.
	    } else if (err) {
	      // An unknown error occurred when uploading.
	    }
	    var finalData = req.body;
		finalData['createdby'] = req.user._id;
		const collegeLogo = await cloudinary.v2.uploader.upload(req.files[0].path);
		const studentImage = await cloudinary.v2.uploader.upload(req.files[1].path);
	    finalData['logoimage'] = collegeLogo.url;
	    finalData['image'] = studentImage.url;
	    StudentCard.create(finalData, function(err, data) {
			if(err) {
				console.log(err);
				res.redirect("/otherFormats/cardsFormats");
			} else {
				data.save();
				res.redirect("/otherFormats/cards");
			}
		})
	  })
	

});
module.exports = router;