


projectData = {};
const bodyParser = require('body-parser');


const express = require('express');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const cors = require('cors'); 
app.use(cors());


app.use(express.static('website'));



const port = 4800;
app.listen(port, () => {
    console.log(`server is listening on port: http://localhost:${port}`);
});



app.get('/getAll', function(req, res){
    res.send(projectData).status(200).end();
});


app.post('/postData', function(req, res){

    projectData={
        temp:req.body.temp,
        date:req.body.date,
        content:req.body.content
    };

    res.send(projectData).status(404).end();
});