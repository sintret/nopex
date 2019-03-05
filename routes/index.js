var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/camera', async function (req, res, next) {
    var ffmpeg = require('ffmpeg');

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
        output: '/home/nopex/public/video/videos.h264',
        width: 1280,
        height: 720,
        timeout: 10000, // Record for 5 seconds
        nopreview: true,
    });

    var recordVideo = await myVideo.record();

    try {
        new ffmpeg('home/nopex/public/video/videos.h264', function (err, video) {
            if (!err) {
                console.log('The video is ready to be processed');
                //video.setVideoFormat('mp4');

                video
                // .setVideoSize('640x?', true, true, '#fff')
                // .setAudioCodec('libfaac')
                    .setVideoFormat('mp4')
                    .save('home/nopex/public/video/videos.mp4', function (error, file) {
                        if (!error)
                            console.log('Video file: ' + file);


                        res.render('index', {
                            title: "express",
                            //imageUrl : '/images/test.jpg',
                            videoUrl: '/video/videos.mp4'
                        });
                    });

            } else {
                console.log('Error: ' + err);
            }
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
});


router.get('/', async function (req, res) {

    req.session.uid = "";

    res.render('layouts/main', {
        renderBody: '/index/index.ejs',
        renderEnd: "/index/indexjs.ejs"
    })
})


router.get('/play/:uid', async function (req, res) {

    var uid = req.params.uid;
    req.session.uid = uid;

    console.log('UID : ' +uid)

    res.render('layouts/main', {
        uid:uid,
        renderBody: '/index/play.ejs',
        renderEnd: "/index/playjs.ejs"
    })
})

router.get('/photos', async function (req, res) {

    var uid = req.session.uid;
    if (uid == "") {

        res.redirect("/")

    } else {
        res.render('layouts/main', {

            renderBody: '/index/photos.ejs',
            renderEnd: "/index/photos.ejs"
        })
    }
})


router.get('/videos', async function (req, res) {

    var uid = req.session.uid;
    if (uid == "") {

        res.redirect("/")

    } else {
        res.render('layouts/main', {

            renderBody: '/index/videos.ejs',
            renderEnd: "/index/videosjs.ejs"
        })
    }
})


module.exports = router;
