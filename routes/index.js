var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {

  const PiCamera = require('pi-camera');
  const myCamera = new PiCamera({
    mode: 'photo',
    output: '/home/nopex/public/images/test.jpg',
    width: 640,
    height: 480,
    nopreview: true,
  });
  var snapit  = await myCamera.snap();

  myCamera.snap()
      .then((result) => {
        // Your picture was captured


        console.log(result)

      })
      .catch((error) => {
        // Handle your error
      });

  res.render('index', {
    title: snapit,
    imageUrl : '/images/test.jpg',
  });

});

module.exports = router;
