const express =require("express");
const router =express.Router();
const ejs=require("ejs")
const request =require("request");
const bodyparser =require("body-parser");
const port = process.env.PORT ||5000;
var argv = require('yargs').argv;
const ffmpeg = require("ffmpeg");
const ytdl = require("ytdl-core");
const fs = require("fs");

// router.set("view engine","ejs");
// router.use(bodyparser.urlencoded({extended:false}));
// router.use(bodyparser.json());


router.post("/",(req,res)=>{
try{
var videoid =req.body.vid
var url;
var file = fs.createWriteStream("video.mp4");
if(videoid == undefined){

  url = req.body.search_url;
}else{
  url = `https://www.youtube.com/watch?v=${videoid}`;
}
 
console.log(url);
const n = url.search("youtube");
if (n !== -1) {
 
  ytdl(url, { filter: (format) => format.container === 'mp4' })
  .pipe(fs.createWriteStream('video.mp4'));

  res.render("downloader");
  
} else {
  res.render("error");
}
}catch(error){
    res.render("error");
}
});

router.post("/yourvideo",(req,res)=>{

    if (
        
        res.statusCode == 200 || res.statusCode == 302
      ) {
    res.download(__dirname + "/../video.mp4");

      }else{
          res.render("error");
      }
});

function deleteFile(file) {
    fs.unlink(file, function(err) {
      if (err) {
        console.error(err.toString());
        res.render("error");
      } else {
        console.warn(file + " deleted");
      }
    });
  }


module.exports =router;