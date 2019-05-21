const express =require("express");
const app =express();
const ejs=require("ejs")
const request =require("request");
const bodyparser =require("body-parser");
const port = process.env.PORT ||5000;
var argv = require('yargs').argv;

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const download =require("./routers/download");
app.use("/download",download);

app.get("/",(req,res)=>{

res.render("index");
});
var result,ytvideoid=[];
app.get("/searchResults",(req,res)=>{ 
  // res.send( req.query.search);
   console.log(req.query.search);
   var search= argv.q || req.query.search;
   var url= `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=${search}&type=video&key=AIzaSyB36DwgbKfup2GDxlDNdQBLAJmUFJXGQ7U`;
    request(url, (err, response, body) => {
    if (!err) {
       
      result =JSON.parse(body);
     // let n=result.items.length();
     for(var i in result.items) {
        var item = result.items[i];
        console.log(item.id.videoId, item.snippet.title);
        ytvideoid.push(item.id.videoId);
        
      }
      if(ytvideoid[0] != null){
         res.render("result",{
            ytvideo1:ytvideoid[0],
            ytvideo2:ytvideoid[1],
            ytvideo3:ytvideoid[2],
            ytvideo4:ytvideoid[3],
            ytvideo5:ytvideoid[4],
            ytvideo6:ytvideoid[5],
            ytvideo7:ytvideoid[6],
            ytvideo8:ytvideoid[7],
            ytvideo9:ytvideoid[8],
            ytvideo10:ytvideoid[9]
         })

      }else{

         res.render("index",{
            message : "No Result Found....."
         })
      }
      
     }else{
      res.render("index",{
         message : "oops.... !  error."
      })
     }
})



ytvideoid=[];

});

app.get("/searchurl",(req,res)=>{

res.render("youtube-url");
});
app.listen(port,console.log("server is running............."));

module.exports = app;
