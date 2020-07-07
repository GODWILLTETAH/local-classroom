const express = require ('express');
const path = require ('path');
const app = express ();
const ejs = require ('ejs');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser'); // require body-parser 
var Schema =mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/Classroom', { useNewUrlParser: true } );


app.use(bodyParser.json());
app.set ('view engine', 'ejs');
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join (__dirname, '/../Websites')));
app.use(express.static('public'));

var mySchema = new Schema ({
  name: {type: String , required:true},
  date: { type: Date, default: Date.now },
  comment : {type: String , required: true}
}, {collection: 'comments'});

var comments=mongoose.model('comments', mySchema);

app.get('/', (req, res) => {
  res.send ('it me express');
});

app.get('/write', (req, res) => {
  comments.find().sort({"_id":-1})
      .then(function(doc){
        //res.render('write');
        res.render('write', {title : doc,});
        res.end;
      });
});

app.post('/write', function (req, res) {
  var id = req.body.name;
  var items = {
    name : req.body.name,
    comment : req.body.comment,
    //date : Date,
  };
  var x = new comments (items);
  x.save(function (err) {
    if (err) return console.log(err);
  }, console.log ( `${id} added a comment` ) );
  res.redirect ('/write');
});


app.listen(3000, () => console.log('listening'));