
<h2 style="text-align: center; margin-top: 100px;font-size:40px">Лабораторная работа №12</h2>
<h2 style="text-align: center; margin-top:10px">Сайт Галерея на NodeJS</h2>
<h3 style="text-align: right; margin-top:400px">Выполнил студент 3 курса <br> Чагочкин Никита</h3>
<h3 style="text-align: center; margin-top:40px">Южно-Сахалинск <br>2022 г. </h3>

- - -


## Решение:
### APP.JS
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
### INDEX.HTML
        <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Галерея</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    </head>
    <style>
        #gallery {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 30%);
            grid-gap: 2%;
            margin: 0 auto;
            justify-content: center;
            margin-top: 2%;
            margin-bottom: 2%;
        }
        img {
        width: 100%;
        height: 100%;
        background: #787772;
        }
        img:hover {opacity: 0.7;}
    </style>
    <body style="background-color: #787772;">
        <div  class="text-warning p-3 bg-dark" >
        <h1 style="text-align: center;">Галерея</h1>
        <select id="selectNumber" style="background-color: #e2e2e2; margin-left: 10%; width: 80%; text-align: center;" class="form-select" >
            <option selected>Выберите Альбом</option>
        </select>
        </div>
        <div id="gallery">
    </div>

        <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script>
            //считываем json файл с альбомами
            //fetch('./jsons/allalbums.json')
            fetch('https://jsonplaceholder.typicode.com/albums')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //добавление альбомов в выпадающий список
                var select = document.getElementById("selectNumber"); 
                for(var i = 0; i < data.length; i++) {
                    var opt = data[i].title;
                    var el = document.createElement("option");
                    el.textContent = data[i].title;
                    el.value = data[i].id;
                    select.appendChild(el);
                    
                }
            });
            //действие при выборе селекта
            $('#selectNumber').on('input', function() {
            let currentalbum= $('#selectNumber').val();
                $("#gallery").html("");
            showImage(currentalbum);
                
            });
            //вывод картинок
            function showImage(album){
                let gallery=document.getElementById("gallery");
                //fetch('./jsons/'+album+'.json')
                fetch('https://jsonplaceholder.typicode.com/photos?albumId='+album)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        const image=document.createElement("img");
                        const a=document.createElement('a');
                        //a.href='./gallery/'+album+'/'+data[i];
                        a.href=data[i].url;
                        //image.src='./gallery/'+$('#selectNumber').val()+'/'+data[i];
                        image.src=data[i].thumbnailUrl;
                        image.className="rounded";
                        a.append(image);
                        gallery.append(a);
                    }
                });
            }
            
        </script>
    </body>
    </html>

- - -
