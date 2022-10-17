const express = require('express')
const fs = require('fs');
const validate = require('validator')
const router = express.Router();






router.get('', (req, res) => {
    res.render('home', {
        title: 'Home Page'
    })
})



router.get('/pageSignup', (req, res) => {
    res.render('signup', {
        title: 'Signup Page'
    })
})




router.get('/pageLogin', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
})



router.get('/pageProfile', (req, res) => {
    res.render('profile', {
        title: 'Profile Page'
    })
})






router.post('/userSignup', (req, res) => {
    try {
        const uname = validate.isAlpha(req.body.name);
        const uemail = validate.isEmail(req.body.email);
        const upassword = validate.isStrongPassword(req.body.password,{
            minLength:6, minUppercase: 1, minSymbols: 1, returnScore: false, minNumbers :1});
        const uphone = validate.isLength(req.body.phone,{
            min:10 ,max:10

        });
        console.log(uphone);
        console.log(req.body.phone.length);


        if (uname === true && uemail === true && upassword === true && uphone === true) {
            const dataBuffer = fs.readFileSync('user.json');
            const dataJson = dataBuffer.toString();
            const Users = JSON.parse(dataJson);
            const duplicate = Users.filter((note) => {
                return note.email === req.body.email && note.phone === req.body.phone && note.password === req.body.password;
            })
            if (duplicate.length === 0) {
                const body = req.body;
                Users.push(body)
                const data = JSON.stringify(Users);
                fs.writeFileSync('user.json', data)
                return res.render('login')
            }
            res.render('signup', {
                message: 'User already exists. please enter diffrent credentials'
            });

        } else if (uemail !== true) {
            res.render('signup', {
                message: 'please enter valid email'
            })
        } else if (upassword !== true) {
            res.render('signup', {
                message: 'Password should contain one symbol,one uppercase letter, one number and minium 6 characters'
            })
        } else if (uphone !== true) {
            res.render('signup', {
                message: 'please enter valid number'
            })
        } else   if (uname !== true) {
            res.render('signup', {
                message: 'please enter alphabets only'
            })

    }
}
    catch (e) {
        res.send({
            message: 'User already exists',
            data: e.message
        })

    }
})




router.post('/userLogin', (req, res) => {
    try {
        const dataBuffer = fs.readFileSync('user.json');
        const dataJson = dataBuffer.toString();
        const Users = JSON.parse(dataJson);
        // Users.forEach( myFunction)
        // function myFunction(user){
        //     if(req.body.email === user.email && req.body.password === user.password ){
        //         res.send({
        //         message :'success',
        //         data : user
        //        })
        //        return
        //     }
        // }
        for (let user of Users) {
            if (req.body.email === user.email && req.body.password === user.password) {
                res.render('home', {
                    title: 'Home Page',
                    message: `Hello ${user.name}`
                })
                return
            }
        }
        for (let user of Users) {
            if (req.body.email !== user.email && req.body.password !== user.password) {
                res.render('home', {
                    title: 'Home Page',
                    message: `Please Login`
                })
                return
            }
            else if (req.body.email !== user.email) {
                res.render('login', {
                    title: 'Login Page',
                    message: `Invalid Email`
                })
                return

            }
            else if (req.body.password !== user.password) {
                res.render('login', {
                    title: 'Login Page',
                    message: `Invalid Password`
                })
                return

            }
        }

    }
    catch (e) {
        console.log('failed');
        res.status(404).send({
            message: 'failed',
            data: e.message
        })

    }


})



router.post('/userProfile', (req, res) => {
    try {
        const dataBuffer = fs.readFileSync('user.json');
        const dataJson = dataBuffer.toString();
        const Users = JSON.parse(dataJson);
        for (let user of Users) {
            if (req.body.email === user.email) {
                res.send({
                    message: 'success',
                    data: user
                })
                return
            }
        }
        res.send('User not Found')


    }
    catch (e) {
        console.log('failed');
        res.status(404).send({
            message: 'failed',
            data: e.message
        })

    }

})

module.exports=router;