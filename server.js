console.log('Server.js is working')

// server file needs to work
// port is listening
// make sure DB is connected and working
// make sure that html file is being rendered

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

var db, employeeCollection;

const url = "mongodb+srv://duane:123@cluster0.l8vrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "Employee";

app.listen(8000, () => { console.log('Listening on port 8000')
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        employeeCollection = db.collection('employees');
        console.log("Connected to `" + dbName + "`!");
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/newEmployee', (req, res) => {
    employeeCollection.insertOne(req.body)
    .then(result => {
        res.redirect('/getList')
        console.log(result)
    })
    .catch(error => console.error(error))
    console.log(req.body)
});


app.get('/getList', (req, res) => {
    employeeCollection.find().toArray()
    .then(results => {
        console.log(results)
        res.render('index.ejs',{employee: results})
    })
    .catch(error => console.error(error))
    // ...
})

app.put('/update', (req, res) => {
    employeeCollection
    .findOneAndUpdate({name: req.body.name, email: req.body.email}, {
    $set: {
        email: req.body.newEmail
    }
    }, {
    sort: {_id: -1},
    upsert: true
    }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
    })
})


app.delete('/deleteEmployee', (req, res) => {
    employeeCollection.findOneAndDelete({name: req.body.name, email: req.body.email}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
    })
})

