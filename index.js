const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const categoriesRoute = require('./routes/categories');
const multer = require('multer');
const path = require('path');


dotenv.config();
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

mongoose.connect(process.env.MONGO_URL)
    .then(console.log('Connected to mongodb'))
    .catch(e => console.log('error ', e));

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images");
    }, 
    filename:(req, file, cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({storage: storage})
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('file has been uploaded!')
})

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/categories', categoriesRoute);

app.use(express.static(path.join(__dirname, "/client")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.js'));
});

app.listen(process.env.PORT || 5000, ()=> {
    console.log('Server has been started on 5000 port');
})

module.exports = app;