const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var items = ["eat","sleep","repeat"];
var workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"));

app.get('/', function(req,res){
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
    
    res.render('list', {listTitle : day, newItems: items});
})

app.post('/', function(req,res){
    let newItem = req.body.newItem;

    if(req.body.list === 'Work List'){
        workItems.push(newItem);
        res.redirect('/work');
    }else{
        items.push(newItem);
        res.redirect('/');
    }
})

app.get('/work', function(req,res){
    res.render('list', {listTitle: "Work List", newItems: workItems});
})

app.get('/about', function(req,res){
    res.render('about');
})

app.listen(3000, function(){
    console.log("server started on port 3000!")
})