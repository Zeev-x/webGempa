const readline = require("readline").createInterface({
  input : process.stdin,
  output : process.stdout });
const http = require("http");
const bmkg = require("zeev-gempa");

bmkg.then(data => {
  var waktu = data.waktu;
  var lintang = data.lintang;
  var bujur = data.bujur;
  var magnitudo = data.magnitudo;
  var kedalaman = data.kedalaman;
  var wilayah = data.wilayah;
  var map = data.map;
  readline.question("Insert port : ",port => {
    http.createServer(function(req,res){
      res.writeHead(200,{"Content-Type" : "text/html"});
      var html = `
             <!DOCTYPE HTML>
               <html>
                 <head>
                   <meta charset="UTF-8" name="keywords">
                   <link rel="stylesheet" type="text/css" href="style.css">
                   <title>info-gempa.io</title>
                </head>
                <body>
                  <nav>
                    <a class="logo">Welcome User</a>
                  </nav>
                  <br><br><br><br>
                  <fieldset class="content">
                    <div align="center">
                      <h1>Info Gempa</h1><hr>
                      <img src="${map}" height="500px">
                    </div><hr>
                    <p>Waktu : ${waktu}</p>
                    <p>Lintang : ${lintang}</p>
                    <p>Bujur : ${bujur}</p>
                    <p>Magnitudo : ${magnitudo}</p>
                    <p>Kedalaman : ${kedalaman}</p>
                    <p>Wilayah : ${wilayah}</p><hr>
                    <div class="waterMark" align="center">
                      <h6>©Copyright Zeev-x 2023</h6>
                    </div>
                  </fieldset>
                  <style>
                    fieldset.content {
                      width: 50%;
                      margin: auto;
                      border-radius: 20px;
                      font-family: Monospace;
                    }
                    nav {
                      display: flex;
                      justify-content: space-between;
                      background-color: white;
                      align-items: center;
                      height: 60px;
                      background-clip: #FFFFFF;
                      box-shadow: 2px 2px 12px rgba(0,0,0,0.2);
                      padding: 0px 5%;
                    }
                    a {
                      text-decoration: none;
                    }
                    .logo {
                      font-family: Courier;
                      color: #000000;
                      font-size: 30px;
                      font-weight: bold;
                    }
                  </style>
                </body>
               </html>`;
      res.write(html);
      res.end();
    }).listen(port);
    console.log("Website runing on port http://localhost:"+port);
  });
});