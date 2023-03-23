//JShint esversion6
const express= require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js');
//console.log(date());

const app = express();
let items =['Buy food','Cook food', 'Eat food'];
const workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){


// if(currentDay===6|| currentDay===0){
//   day = 'weekend';
// } else{
//   day = 'weekday';
// }
let day = date.getDate();
res.render("list",{listTitle:day, NewListItems:items});
});

app.post('/', function(req,res){
  let item= req.body.newitem;
  if(req.body.list==='work'){
    workItems.push(item);
    res.redirect('/work');
  } else{
    items.push(item);
    res.redirect('/');
  }
  // items.push(item);
  // res.redirect('/');
  // console.log(item);
})

app.get('/work' ,function(req,res){
  res.render('list',{listTitle: 'work list',NewListItems:workItems});
});
app.post('/work', function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});

app.get('/about', function(req,res){
  res.render('about');
})




app.listen(3000, function(){
  console.log("Server started on port 3000")
});
