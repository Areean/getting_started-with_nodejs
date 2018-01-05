//requirements
const express=require('express');
const bodyParser=require('body-parser');
let config = require('./config/config');
let logger=require('./services/logger');
let users=require('./db/user.json');
const app = express();


let myLogger = (req,res,next)=>{
    logger.info(`access to the ${req.originalUrl} route`);
    next();
};
app.use('*',myLogger);



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    logger.info('access to the API route');
    res.sendFile('index.html',{root:'./views/'});
});

app.get('/users',(req,res)=>{
    res.send(users);
});

app.post('/users', (req, res) => {
    users.push(req.body);
    res.setHeader('content-type', 'text/plain');
    res.write('users changed to:\n');
    res.write(JSON.stringify(users, null, 2));
    res.write('\n');
    res.write('you added this:\n');
    res.end(JSON.stringify(req.body, null, 2));

});

app.get('/about', (req, res) => {
    res.sendFile('about.html',{root:'./views/'});
});
app.get('/contact', (req, res) => {
    res.sendFile('contact.html', { root: './views/' });
});

app.post('/log', (req, res) => {
    let message=req.body.message;
    logger.log(message);
    res.send('a new log stored successfully');
});


app.post('/login',(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;

    users.forEach((user) => {
        if (user.username === username && user.password === password){
            res.json({isAuthenticated: true}) ;
            return;
        }
    });
    res.json({ isAuthenticated: false });

});


//listen app
app.listen(config.port, (err) => {
    if (err) {
        return logger.error('sth bad happened!', err);
    }
    logger.info(`${config.applicationName} is listening on port ${config.port}`);
});



/*

app.engine('.hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs',
    layoutDir:path.join(__dirname,'views/layouts')
}))
app.set('view engine','.hbs')
app.set('views',path.join(__dirname,'views'))




app.get('/',(req,res)=>{
    res.render('home',{
        name:'John'
    })
})

//import module
var moduleHello=require('./moduls/moduleHello.js');

//create an object for users
var users=[{
    name:'John'
},
{
    name:'Jane'
}];

// write APIs methods

//get
//post
//put
//delete

app.use((req,res,next)=>{
    console.log(req.headers)
    next()
})
app.use((req, res, next) => {
    req.chance=Math.random()
    next()
})
app.use((err,req,res,next)=>{
    consol.log(err)
    response.status(500).send(
        'something broken!'
    )
})
//howm page route
app.get('/',function(req,res){
    res.send(`<h1>${moduleHello.sayHi()}</h1>`);
  
});

//get users
app.get('/users',function(req,res){
    res.send(moduleHello.sayHello());
});

//get about
app.get('/about',function(req,res){
res.sendFile('about.html',{root:'./views'});
});
*/
