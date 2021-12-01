var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const https = require('https');
var FormData = require('form-data');
const os = require('os');
const session = require('express-session');
// const faceapi = require("face-api.js");  
// const canvas = require("canvas");
const fs = require("fs").promises;
const imageDataURI = require("image-data-uri");

// const { Canvas, Image, ImageData } = canvas  
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
// faceapi.env.monkeyPatch({ fetch: fetch });
// const faceDetectionNet = faceapi.nets.ssdMobilenetv1

// // SsdMobilenetv1Options
// const minConfidence = 0.5


// function getFaceDetectorOptions(net) {  
//   return net === faceapi.nets.ssdMobilenetv1
//       ? new faceapi.SsdMobilenetv1Options({ minConfidence })
//       : (net === faceapi.nets.tinyFaceDetector
//           ? new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
//           : new faceapi.MtcnnOptions({ minFaceSize, scaleFactor })
//       )
// }

// const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet)
// faceDetectionNet.loadFromDisk('./public/models');
// faceapi.nets.faceLandmark68Net.loadFromDisk('./public/models');
// faceapi.nets.faceRecognitionNet.loadFromDisk('./public/models');
// faceapi.nets.faceExpressionNet.loadFromDisk('./public/models');


//const { BrowserWindow } = require('electron')
//const remote = require('electron').remote;
//const {ipcRenderer} = require('electron');
// var admin = require("firebase-admin")

// let bucket = admin.storage().bucket()

router.get('/', function (req, res, next) {


  if (!isCallerMobile(req)) {
    res.render('index', { title: 'Express', msg: "" });

  } else {
    res.render('index-mobile', { title: 'Express', msg: "" });

  }
  //window.close();

  //res.render('index', { title: 'Express', msg: "" });
});


function isCallerMobile(req) {
  var ua = req.headers['user-agent'].toLowerCase(),
    isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));

  return !!isMobile;
}

router.post('/form-submit', async (req, res, next) => {

  console.log(req.body);
  var email, password;

  email = req.body.email;
  password = req.body.password;



  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);



  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });


  // const response = await fetch('https://139.162.36.222/dls_test/api/appapi/login',
  //  {method: 'POST',
  //  headers:{
  //   'Authorization': 'Basic ' + Buffer.from('denadmin:Denn1234', 'binary').toString('base64')
  // }, 
  // body: form});
  // const data = await response.json();

  //console.log(data);

  fetch('https://139.162.36.222/dls_test/api/appapi/login', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': 'Basic ' + Buffer.from('denadmin:Denn1234', 'binary').toString('base64')
    }
  }).then(res => res.json())
    .then(json => {
      console.log(json);
      if (json.message != "Not Found") {

        //session = req.session;
        session.auth_token = json.token;
        session.visitorId = req.body.visitorId;
        console.log(json)
        res.send('success');
      } else {

        res.send('Incorrect UserName Or Password');
      }
    });
});


router.get('/takephoto', function (req, res, next) {

  res.render('takephoto', { title: 'Express' });
});


router.post('/CurrentImage', (req, res, next) => {

  //console.log(req.body);

  //session = req.session;
  CurrentImage = req.body.image;



  // let formData = new FormData();
  // formData.append('email', email);
  // formData.append('password', password);
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });


  fetch('https://139.162.36.222/dls_test/api/appapi/userdata?auth_token=' + session.auth_token, {
    method: 'GET',

    headers: {
      'Authorization': 'Basic ' + Buffer.from('denadmin:Denn1234', 'binary').toString('base64')
    }
  }).then(resp => resp.json())
    .then(async (json) => {
      //console.log(json);
      if (json.status == 200) {


        var Current_device;
        var apps = json.app_data;



        if (apps.length > 0) {

          var foundevice = false;
          var app;
          for (var u = 0; u < apps.length; u++) {

            if (apps[u].device_id == session.visitorId) {
              foundevice = true;
              app = apps[u];
              break;

            }
          }


          if (foundevice) {

            if (app.status != "approved") {
              return res.send("Your data has been sent to server for verification, kindly check back after some time.");

            }
            else if (app.status == "approved") {
              // var key = json.student_id + "::" + json.email + "::" + app.device_id + "::" + json.student_code;

              //   var url = "https://www.denningportal.com/dls_test/login/app_login/" + Buffer.from(key).toString('base64');
              // return res.send("approved" + "**" +url  + "**" + session.visitorId);

              Current_device = app;



              // const imgUrl = `${session.visitorId}.jpeg`
              // //const img = await faceapi.fetchImage(imgUrl)
              // const img = await canvas.loadImage(imgUrl);
              // // detect the face with the highest score in the image and compute it's landmarks and face descriptor
              // const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

              // if (!fullFaceDescription) {
              //   console.log("No faces Found");
              // }


              // var imageMatcher = req.body.image_tensor;
              // const bestMatch = imageMatcher.findBestMatch(fullFaceDescription.descriptor)
              // console.log(bestMatch.toString())

              // if (bestMatch.verified == true) {


              //   var key = json.student_id + "::" + json.email + "::" + app.device_id + "::" + json.student_code;

              //   var url = "https://www.denningportal.com/dls_test/login/app_login/" + Buffer.from(key).toString('base64');
              //   return res.send(url);

              // } else {
              //   return res.send("Face Verification Failed, Kindly retake photo to access portal")


              // }

              let formData = new FormData();

              //const imgUrl = `http://localhost:3000/${session.visitorId}.jpeg`;

              imageDataURI.encodeFromFile(`./public/${session.visitorId}.jpeg`)
              .then(resBase64 => {
                //console.log(res)
                
                
                //let temp2 = Buffer.from(res, 'base64').toString();

                formData.append('base1', CurrentImage);
                formData.append('base2', resBase64);



                fetch('http://172.104.188.61:5000/verify', {
                  method: 'POST',
                  body: formData,

                }).then(respython => respython.json())
                  .then(jsonp => {
                    console.log(jsonp);
                    if (jsonp.verified == true) {

                      //var window = remote.getCurrentWindow();

                      // const win = new BrowserWindow({ width: 800, height: 600 })

                      var key = json.student_id + "::" + json.email + "::" + app.device_id + "::" + json.student_code;

                      var url = "https://www.denningportal.com/dls_test/login/app_login/" + Buffer.from(key).toString('base64');
                      return res.send(url);


                      // win.loadURL(url)
                      // window.close();


                    } else {
                      return res.send("Face Verification Failed, Kindly retake photo to access portal")


                    }
                  }).catch(err => {
                    console.log(err)
                    return res.send("Face Verification Failed, Kindly retake photo to access portal")


                  });

              
              
              
              
              
              })
              .catch(err => console.log(err))


              //const contents = await fs.readFileSync(`./public/${session.visitorId}.jpeg`, {encoding: 'base64'});



             // var imgStr = session.visitorId + '.jpeg';
              //fs.readFile(`./public/${session.visitorId}.jpeg`, function (err, data) {
                //if (err){
                // console.log(err) 
                //} // Fail if the file can't be read.
                //const img = await fetch(imgUrl);
                // // let temp = atob(app.profile_image);
               


                //res.writeHead(200, {'Content-Type': 'image/jpeg'});
                //res.end(data); // Send the file data to the browser.
              


            }



          } else {



            // const fileName = os.platform() + "_" + os.hostname() + student_id + '.jpg';
            // await bucket.file(fileName).createWriteStream().end(CurrentImage)

            const data = CurrentImage.replace(/^data:image\/\w+;base64,/, "");

            const buf = Buffer.from(data, "base64");
            await fs.writeFile(`./public/${session.visitorId}.jpeg`, buf);



            let formData = new FormData();
            //formData.append('base1', CurrentImage);
            formData.append('auth_token', session.auth_token);
            formData.append('student_id', json.student_id);
            formData.append('student_code', json.student_code);
            formData.append('name', json.name);
            formData.append('profile_image', `${session.visitorId}.jpeg`);
            formData.append('data_points', "");
            formData.append('device_id', session.visitorId);
            formData.append('device_name', session.visitorId);
            formData.append('ip_address', req.ip);
            formData.append('device_mac_address', "");
            formData.append('device_type', "browser");
            formData.append('status', 'processing');


            fetch('https://139.162.36.222/dls_test/api/appapi/student_app_data', {
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': 'Basic ' + Buffer.from('denadmin:Denn1234', 'binary').toString('base64')
              }
            }).then(resp => resp.json())
              .then(jsonp2 => {
                console.log(jsonp2);
                if (jsonp2.status == 200) {
                  // alert("Your data has been sent to server for verification, kindly check back after some time.")
                  //var window = remote.getCurrentWindow();
                  //window.close();
                  return res.send("Your data has been sent to server for verification, kindly check back after some time.");

                }
              });
          }

          // })
          //}

        }
        else {

          const data = CurrentImage.replace(/^data:image\/\w+;base64,/, "");

          const buf = Buffer.from(data, "base64");
          await fs.writeFile(`./public/${session.visitorId}.jpeg`, buf);

          let formData = new FormData();
          //formData.append('base1', CurrentImage);
          formData.append('auth_token', session.auth_token);
          formData.append('student_id', json.student_id);
          formData.append('student_code', json.student_code);
          formData.append('name', json.name);
          formData.append('profile_image', `${session.visitorId}.jpeg`);
          formData.append('data_points', "");
          formData.append('device_id', session.visitorId);
          formData.append('device_name', os.platform());
          formData.append('ip_address', req.ip);
          formData.append('device_mac_address', "");
          formData.append('device_type', os.type());
          formData.append('status', 'processing');


          fetch('https://139.162.36.222/dls_test/api/appapi/student_app_data', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': 'Basic ' + Buffer.from('denadmin:Denn1234', 'binary').toString('base64')
            }
          }).then(resp => resp.json())
            .then(jsonp2 => {
              console.log(jsonp2);
              if (jsonp2.status == 200) {
                // alert("Your data has been sent to server for verification, kindly check back after some time.")
                //var window = remote.getCurrentWindow();
                //window.close();
                return res.send("Your data has been sent to server for verification, kindly check back after some time.");

              }
            });
        }












      }
      //res.render('takephoto', { title: 'Express' });
    })
});






module.exports = router;
