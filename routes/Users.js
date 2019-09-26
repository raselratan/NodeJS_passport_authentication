const express = require('express')
const usersRoute = express.Router()
const cors = require('cors')
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel')
usersRoute.use(cors())

usersRoute.get('/register', (req, res) => {
    res.render('register') 
})


usersRoute.post('/register',(req,res)=>{
  var { name, email,mobile, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !mobile) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      mobile,
      password,
      password2
    });
  } else {
    UserModel.findOne({
      where: {
        email: email
      }
    }).then(user=>{
      if(!user){
        if(password == password2){
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              console.log(hash)
              password = hash;
             let userdata = { name, email,mobile, password }
  
             UserModel.create(userdata).then(user=>{
              errors.push({ msg: 'Successfully Registered' });
              res.render('register', {
                errors
              });
            })
  
            })
          })
        }else{
          errors.push({ msg: 'Password miss matched' });
          res.render('register', {
            errors,
            name,
            email,
            mobile,
            password,
            password2
          });
        }
      }else{
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          mobile,
          password,
          password2
        });
      }
    })
  }
});

module.exports = usersRoute