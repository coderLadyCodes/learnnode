const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


// EXPRESS APP
const app = express();

// CONNECT TO MONGODB
const dbURI = 'mongodb+srv://sam:simpleblogwebsite@nodesimpleblog.chice.mongodb.net/node-simple-blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

// MIDDLEWARE AND STATIC FILES 'css'
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



app.get('/', (req, res) => {
   res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.use('/blogs', blogRoutes)

// 404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});