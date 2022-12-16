const fs = require('fs');

const dirs=fs.readdirSync("./gallery", { withFileTypes: true })
.filter(d => d.isDirectory())
.map(d => d.name);

fs.writeFile('./jsons/allalbums.json',JSON.stringify(dirs),'utf8',function(err){
    console.log(err);
});

for (let i = 0; i < dirs.length; i++) {
    const images=fs.readdirSync('./gallery/'+dirs[i]);
    fs.writeFile('./jsons/'+dirs[i]+'.json',JSON.stringify(images),'utf8',function(err){
        console.log(err);
    });
    
}

const express = require("express");
const app = express();
app.use(express.static(__dirname ));
app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});

  