const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret:'secretkey',
    resave:false,
    saveUninitialized:false
}));
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/', authRoutes);
app.use('/courses', courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
