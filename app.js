const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const app = require('./server');
const userRouter = require('./Routes/userRoutes');
const pgp = require('pg-promise')(/* options */)

const db = pgp('postgres://postgres:postgres@localhost:5432/johnyme');

const port = 3000;

app.use(morgan('dev'));

app.use(express.json());

app.use(userRouter);

app.get('/', (req, res) => {
    db.any('SELECT * from users')
    .then(function (data) {
        console.log('DATA:', data.value)
        res.send('success');
    })
    .catch(function (error) {
        console.log('ERROR:', error)
        res.send('<h1>failed</h1>');
    });
})

app.get('/favicon.ico',(req, res) => {

    fs.readFile(`${__dirname}/image.jpg`, function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
    });
    
})

app.listen(port, (req, res)=>{
    console.log(`started listening on port ${port}`);
});