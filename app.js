const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var items = ["eat","sleep","repeat"];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function(req,res){
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

   
    res.render('list', {kindOfDay : day, newItems: items});
})

app.post('/', function(req,res){
    let newItem = req.body.newItem;
    items.push(newItem);
    res.redirect('/');
})

app.listen(3000, function(){
    console.log("server started on port 3000!")
})