const express= require('express')
const fs = require('fs');
const port =2000;


const app =express()

app.use(express.json())



app.post('/user',(req,res) =>{
    try{ 
        const dataBuffer = fs.readFileSync('user.json');                                        
        const dataJson = dataBuffer.toString();
        const Users= JSON.parse(dataJson)

        const duplicate =Users.filter((note) =>{
            return note.email === req.body.email && note.phone ===req.body.phone && note.password === req.body.password;
        })

        if(duplicate.length ===0){
            const body =req.body
            Users.push(body)
            const data =JSON.stringify(Users);
            fs.writeFileSync('user.json',data)
            return res.send({
                message : 'success',
                data : data
            })
        }
        else{
            throw new Error()
        }

    }
    catch(e){
        res.send({
            message : 'User already exists',
            data : e
        })

    }
})


app.post('/user/sign' ,  (req,res) =>{ 
  try{
    const dataBuffer = fs.readFileSync('user.json');
    const dataJson = dataBuffer.toString();
    const Users= JSON.parse(dataJson);
    Users.map(myfunction)
    function myfunction(user){
        if(req.body.email === user.email && req.body.password === user.password ){
             res.send({
            message :'success',
            data : user
           })
        }
        else{
            throw new Error()
        }
    }
  
}
catch(e){
    res.status(404).send({
        message : 'failed',
        data : e
    })

}


})

app.listen(port,() => {
    console.log('server is up on port '+port);
})




