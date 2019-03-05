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

    //'ws://'+document.location.hostname+':8082/';
    var ws = 'ws://';
    var ip = 'myjurnal.online'
    var url = ip;

    var unique = {
        anggrek10: {
            port1:8081,
            port2:8082,
            url: url+':8002'
        },
        mawar90: {
            port1:8083,
            port2:8084,
            url: url+':8004'
        },
        keyboard8: {
            port1:8085,
            port2:8086,
            url: url+':8086'
        },
        kranair: {
            port1:8087,
            port2:8088,
            url: url+':8088'
        },
        selangair: {
            port1:8089,
            port2:8090,
            url: url+':8090'
        },
        tehmanis: {
            port1:8091,
            port2:8092,
            url: url+':8092'
        },
        kopi: {
            port1:8093,
            port2:8094,
            url: url+':8094'
        },
        samsu: {
            port1:8095,
            port2:8096,
            url: url+':8096'
        },
        komporgas: {
            port1:8097,
            port2:8098,
            url: url+':8098'
        },
        kipasangin: {
            port1:8099,
            port2:8100,
            url: url+':8100'
        },
        kantong: {
            port1:8101,
            port2:8102,
            url: url+':8102'
        }
    }

    if(unique.hasOwnProperty(uid)){
        req.session.uid = uid;

        console.log('UID : ' +uid)

        res.render('layouts/main', {
            uid:uid,
            json:JSON.stringify(unique[uid]),
            renderBody: '/index/play.ejs',
            renderEnd: "/index/playjs.ejs"
        })

    } else {

        res.redirect('/')

    }
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
