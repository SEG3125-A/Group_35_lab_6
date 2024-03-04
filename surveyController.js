// this code is inspired by Caroline Barriere's code and NetNinja https://www.youtube.com/watch?v=yXEesONd_54&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=7
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
    // serve the page survey itself
    app.get('/', function(req, res){
        // It was sendFile
        //res.sendFile('/views/index.html',{root:__dirname});
        res.render('index');
    });

    // serve the analysis page when user goes at localhost:3000/analysis
    app.get('/analysis', function(req, res){
        // It was sendFile
        //res.sendFile('/views/analysis.html',{root:__dirname});
        var q1 = readData("Q1");
        var q2 = readData("Q2");
        var q3 = readData("Q3");
        var q4 = readData("Q4");
        var q5 = readData("Q5");
        var q6 = readData("Q6");
        var q7 = readData("Q7");

        res.render('analysis', {results: [q1, q2, q3, q4, q5, q6, q7] });
        console.log([q1, q2, q3, q4, q5, q6, q7]);
    });

    
    app.post('/',urlencodedParser, function(req,res){
        console.log(req.body);
        let json = req.body;
        

        for (let key in json) {
            // console.log(key+"::::: "+json[key]);
            if(key == "Q1" || key == "Q2" || key == "Q3" || key == "Q4" || key == "Q5" || key == "Q6" || key == "Q7") {
                processData(key,json[key]);
            }
        }
        
    })
    // serve the analysis when user goes to an undefined page
    app.use((req, res)=>{
        res.status(404).render('404');
    });
    // // 404 page, should always be at the bottom
    // app.use((req,res)=>{
    //     res.status(404).sendFile('/views/404.html',{root:__dirname});
    // })
};