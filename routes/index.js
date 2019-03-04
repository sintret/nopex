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
  //var snapit  = await myCamera.snap();
  const myVideo = new PiCamera({
    mode: 'video',
    output: '/home/nopex/public/video/video.h264',
    width: 1920,
    height: 1080,
    timeout: 5000, // Record for 5 seconds
    nopreview: true,
  });

  var recordVideo = myVideo.record();

  res.render('index', {
    title: snapit,
    //imageUrl : '/images/test.jpg',
    videoUrl : '/video/video.h264'
  });

});

module.exports = router;
