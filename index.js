const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");


const app = express();
const PORT = 4000;

const client = new mongodb.MongoClient("mongodb://127.0.0.1:27017");
const db = "b8";

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{

    res.send (Hello)
        

});

const employees = [
   {
     name:"Syed",
     employee_code: 9090
},
{
    name:"Ameer",
    employee_code: 9091
},
{
    name:"Nase",
    employee_code: 9092
},
{
    name:"Saifullah",
    employee_code: 9093
},
{
    name:"Razik",
    employee_code: 9094
},

]
app.get("/users",(req, res)=>{
    console.log(req.body);
    res.send({
        data: employees,
        message: "Success"
    })
});

app.post("/ singup",(res,req)=>{
   console.log( req.body)
})



app.post('/login',(req,res)=>{
    console.log({body: req.body});
    const {email, password} = req.body;
    const rightEmail = "nase@nase.com";
    const rightPassword = "12345";
    if(email ===rightEmail) {
     if (password === rightPassword){
        res.send({
            message: "Login success!",
            user:{
                name:"Rasik",
                role:"Admin",
                employeeCode:9099
            }
        });

    }else{
        res.status(401).send({
            message: " Password does not match!"
        
        })
    
    }
    } else{
            res.status(401).send({
                message: "Account does not exist"
            })  
       

    }

    
}

)
app.listen ( PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
});