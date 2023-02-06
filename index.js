const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const config = require('config');
const mongo_username = config.get('mongo_username');
const mongo_password = config.get('mongo_password');


mongoose.connect('mongodb+srv://'+mongo_username+':'+mongo_password+'@cluster0.txhhe.mongodb.net/file-app', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...'))

        const dataSchema = new mongoose.Schema({
            ip: String,
            files: []
          });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {

        //mongodb connection
        
        let ip = req.body.ip;
        let files = req.body.files;


        const Data = mongoose.model('Data', dataSchema);

        const newData = {
            ip: req.body.ip,
            files: req.body.files
          };
        
          // Save the data to the collection
          Data.findOneAndUpdate({ ip: newData.ip }, newData, { upsert: true, new: true }, (error, data) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Name added successfully!');
            }
          });




    res.send('Register')
})

app.post('/test', (req, res) => {

    console.log(req.body.files);
})


app.get('/find', (req, res) => {

    let fileName = req.query.fileName;
    const Data = mongoose.model('Data', dataSchema);

    Data.find({files: fileName}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.send(data);
        }
    })



})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})