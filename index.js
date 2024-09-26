const cookieParser = require('cookie-parser');
const express=require('express');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const app=express();

app.use(cookieParser())
//set cookie
app.get("/",function(req,res){
    res.cookie("name","Prabhat");
    res.send("Done");
})
//bcrypt password
app.get('/getpassword',function(req,res){
    let hashpasword;
    bcrypt.genSalt(10,function(err,salt){
         hashpasword=bcrypt.hash("MyPassword123",salt,function(err,hash){
            //store this passowrd in  db
            console.log(hash);
        })
    })
    res.send('send');
})
//match password
app.get('/matchpassword',(req,res)=>{
    bcrypt.compare('MyPassword123','$2b$10$0/hX8W6Wz8dWtWrmbWhX2OHRYlQUDGJzylcroxhQj/cXWH4KGrqeK',function(err,result){
console.log(result);
    })
})
 //how to genrate token using jwt and set in to cookies and cookies access all over the web page
//WT then uses the sign() method to create a JSON Web Token for that user and returns the token in the form of a JSON string. app.
 app.get('/settoken',(req,res)=>{
    let toekn=jwt.sign({email:"prabhat0987@gmail.com"},'secrate');
    console.log(toekn);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWJoYXQwOTg3QGdtYWlsLmNvbSIsImlhdCI6MTcyNzM3NjM2MH0.YHBSFgeR7sLlgC7zsCeCy7qi5TlD2OephKHFE2Iik8Q
    res.cookie("token",toekn);//set token in cookies
    res.send('Token done');
 })

app.get('/readtoken',(req,res)=>{
    let data=jwt.verify(req.cookies.token,"secrate");
    console.log(data);//{ email: 'prabhat0987@gmail.com', iat: 1727376414 }
})

app.get("/read",function(req,res){
     console.log(req.cookies);//{ name: 'Prabhat' }
    res.send("Read Page")
})

app.listen(3000);