var express = require('express');
var router = express.Router();

var

/* GET home page. */
router.get('/', async function(req, res, next) {

  const PiCamera = require('pi-camera');
  const myCamera = new PiCamera({
    mode: 'photo',
    output: appRoot+'/tost.jpg',
    width: 640,
    height: 480,
    nopreview: true,
  });
  var snapit  = await myCamera.snap();

  res.render('index', {
    title: snapit,
    imageUrl : appRoot+'/tost.jpg',
  });
});

module.exports = router;
