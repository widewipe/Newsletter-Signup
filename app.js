const exp = require('express');
const bodyParser = require('body-parser');

const app = exp();
app.use(bodyParser.urlencoded({extended:true}));
app.use(exp.static('public'));
app.set('view engine', 'ejs');

var title = '';
var error = '';
var email = '';


app.get('/', function(req, res){
    title = 'Sign Up To Our Newsletter';
    res.render('index', {title: title, error: error});
    error = '';
})

app.post('/', function(req, res){
    email = req.body.email;
    let regem = new RegExp('[a-z0-9]+@[a-z]+\.com');
    if(regem.test(email)===true) {
        res.redirect('/success');
    } else {
        error = 'Valid email required!';
        res.redirect('/');
    }
})

app.get('/success', function(req, res){
    title = 'Success! Thanks for signing up to our newsletter';
    res.render('success', {title:'success', subemail: email});
})

app.post('/success', function(req, res){
    res.redirect('/');
})


app.listen(process.env.PORT || 3000, function(){
    console.log('server start . . .');
})