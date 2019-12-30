const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

/* Import End-Points */
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

/* Database Connection */
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'Cobra2019',
    database: 'smart_brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

/* End-Points */
app.get('/', (req, res) => { res.send('It is working!') })
/*Signing */
app.post('/signin', (req, res) => { signin.handleSignin(req, res,db, bcrypt)})
/* Register */
app.post('/register', (req, res) => { register.handleRegister(req, res,db, bcrypt)})
/* Profile */
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
/* Image */
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
/* ImageUrl */
app.post('/imageUrl', (req, res) => { image.handleAPICall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});