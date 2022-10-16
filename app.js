const express = require('express')
const fs = require('fs');
const path = require('path');
const hbs = require('hbs')
const validate = require('validator')
const port = 2000;
const bodyParser = require('body-parser');
const { validateHeaderValue } = require('http');
const app = express()
const router=require('./routes/user')

const path1 = path.join(__dirname, '../TASK/backend');
const viewPath = path.join(__dirname, '../TASK/backend/views');
const headerPath = path.join(__dirname, '../TASK/backend/views/partials');

app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(headerPath);

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path1))
app.use(router);




// app.get('', (req, res) => {
//     res.render('home', {
//         title: 'Home Page'
//     })
// })



// app.get('/pageSignup', (req, res) => {
//     res.render('signup', {
//         title: 'Signup Page'
//     })
// })




// app.get('/pageLogin', (req, res) => {
//     res.render('login', {
//         title: 'Login Page'
//     })
// })



// app.get('/pageProfile', (req, res) => {
//     res.render('profile', {
//         title: 'Profile Page'
//     })
// })






// app.post('/userSignup', (req, res) => {
//     try {
//         const uname = validate.isAlpha(req.body.name);
//         const uemail = validate.isEmail(req.body.email);
//         const upassword = validate.isAlphanumeric(req.body.password);
//         const passwordlength = validate.isLength(req.body.password, 6, undefined)
//         const uphone = validate.isMobilePhone(req.body.phone, 10,10);

//         if (uname !== true) {
//             res.render('signup', {
//                 message: 'please enter alphabets only'
//             })

//         } else if (uemail !== true) {
//             res.render('signup', {
//                 message: 'please enter valid email'
//             })
//         } else if (upassword !== true) {
//             res.render('signup', {
//                 message: 'please enter alphanumeric password'
//             })
//         } else if (passwordlength !== true) {
//             res.render('signup', {
//                 message: 'password must contain min 6 characters'
//             })
//         } else if (uphone !== true) {
//             res.render('signup', {
//                 message: 'please enter valid number'
//             })
//         } else if (uname === true && uemail === true && upassword === true && passwordlength === true && uphone === true) {
//             const dataBuffer = fs.readFileSync('user.json');
//             const dataJson = dataBuffer.toString();
//             const Users = JSON.parse(dataJson);
//             const duplicate = Users.filter((note) => {
//                 return note.email === req.body.email && note.phone === req.body.phone && note.password === req.body.password;
//             })
//             if (duplicate.length === 0) {
//                 const body = req.body;
//                 Users.push(body)
//                 const data = JSON.stringify(Users);
//                 fs.writeFileSync('user.json', data)
//                 return res.render('login')
//             }
//             res.render('signup', {
//                 message: 'User already exists. please enter diffrent credentials'
//             });

//         }

//     }
//     catch (e) {
//         res.send({
//             message: 'User already exists',
//             data: e
//         })

//     }
// })




// app.post('/userLogin', (req, res) => {
//     try {
//         const dataBuffer = fs.readFileSync('user.json');
//         const dataJson = dataBuffer.toString();
//         const Users = JSON.parse(dataJson);
//         // Users.forEach( myFunction)
//         // function myFunction(user){
//         //     if(req.body.email === user.email && req.body.password === user.password ){
//         //         res.send({
//         //         message :'success',
//         //         data : user
//         //        })
//         //        return
//         //     }
//         // }
//         for (let user of Users) {
//             if (req.body.email === user.email && req.body.password === user.password) {
//                 res.render('home', {
//                     title: 'Home Page',
//                     message: `Hello ${user.name}`
//                 })
//                 return
//             }
//         }
//         for (let user of Users) {
//             if (req.body.email !== user.email && req.body.password !== user.password) {
//                 res.render('home', {
//                     title: 'Home Page',
//                     message: `Please Login`
//                 })
//                 return
//             }
//             else if (req.body.email !== user.email) {
//                 res.render('login', {
//                     title: 'Login Page',
//                     message: `Invalid Email`
//                 })
//                 return

//             }
//             else if (req.body.password !== user.password) {
//                 res.render('login', {
//                     title: 'Login Page',
//                     message: `Invalid Password`
//                 })
//                 return

//             }
//         }

//     }
//     catch (e) {
//         console.log('failed');
//         res.status(404).send({
//             message: 'failed',
//             data: e.message
//         })

//     }


// })



// app.post('/userProfile', (req, res) => {
//     try {
//         const dataBuffer = fs.readFileSync('user.json');
//         const dataJson = dataBuffer.toString();
//         const Users = JSON.parse(dataJson);
//         for (let user of Users) {
//             if (req.body.email === user.email) {
//                 res.send({
//                     message: 'success',
//                     data: user
//                 })
//                 return
//             }
//         }
//         res.send('User not Found')


//     }
//     catch (e) {
//         console.log('failed');
//         res.status(404).send({
//             message: 'failed',
//             data: e.message
//         })

//     }

// })




app.listen(port, () => {
    console.log('server is up on port ' + port);
})




