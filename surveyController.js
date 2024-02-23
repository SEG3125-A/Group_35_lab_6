// required packages
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');

// File Naming Convention:

// ease.json: question1
// feature.json: question2
// functionality.json: question3
// design.json: question4

// read the data file
function readData(fileName){
    // diff between readFileSync and readFile is that this one below is a blocking call. Nothing 
    // will be executed until it finishes reading
    let dataRead = fs.readFileSync('./data/' + fileName + '.json');
    let infoRead = JSON.parse(dataRead);
    return infoRead;
}

// read the data file
function writeData(info, fileName){
    // console.log("before info is",info);
    data = JSON.stringify(info);
    // console.log("after info is",data);
    // same problem between writeFileSync and writeFile. 
    fs.writeFileSync('./data/' + fileName + '.json', data);
}

// key is the name property on the input; this name property is the same as the name of the file
//that the answer is saved to. 

// processing data differ according to the question:
// q1: ease.js. It consists of two responses; we increment the specific response by 1. (either yes or no)

// the we write the new data to the same file we read from.

const processData = (key,value)=>{
    let data = readData(key);
    // console.log("the data is",data);
    let flag = 0;
    for (let i = 0;i<data.length;i++){
        // console.log("the item is",data[i]);
        if (data[i].res == value) {
            data[i].count +=1;
            // found an entry
            flag = 1;
        }
    }

    // We didn't find what we were looking for :(. We put this
    if (flag === 0){
        data.push({res:value,count:1})
    }
    writeData(data,key)
}


// This is the controler per se, with the get/post
// Route handler
module.exports = function(app){

    // when a user goes to localhost:3000/
    // serve a static html (the survey itself to fill in)
    app.get('/', function(req, res){
        // It was sendFile
        res.sendFile('/views/index.html',{root:__dirname});
    });


    app.get('/analysis', function(req, res){
        // It was sendFile
        res.sendFile('/views/analysis.html',{root:__dirname});
    });

    // TODO // need to add a post request for data that the index.html carries

    app.post('/',urlencodedParser,(req,res)=>{
        // console.log(req.body);
        let json = req.body;

        for (let key in json) {
            // console.log(key+"::::: "+json[key]);
            if(key == "ease" || key == "feature" || key == "functionality" || key == "design") {
                processData(key,json[key]);
            }
        }
    })

    // 404 page, should always be at the bottom
    app.use((req,res)=>{
        res.status(404).sendFile('/views/404.html',{root:__dirname});
    })
};