var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {


  var imagePath = appRoot+"/public/images";

  const PiCamera = require('pi-camera');
  const myCamera = new PiCamera({
    mode: 'photo',
    output: imagePath+'/tost.jpg',
    width: 640,
    height: 480,
    nopreview: true,
  });
  var snapit  = await myCamera.snap();

  res.render('index', {
    title: snapit,
    imageUrl : '/images/tost.jpg',
  });
});

module.exports = router;
