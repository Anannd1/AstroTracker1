import express from "express"
import { path } from "framer-motion/client"
import mysql2 from "mysql2"
import cors from "cors"
 
const app = express()
app.use(express.json())
app.use(cors())

const id = 1234;

const db = mysql2.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database:"astro",
  port:"3307"
})

app.get("/", (req, res)=>{
  const q = "select blog_id, title, short_desc, author_id from blog";
  db.query(q, (err,data)=>{

    if (err) return res.json(err);
    return res.json(data);
  })
})

app.get("/user/:username", (req, res)=>{
  const q = "select * from `user_data` where username=? ";

  db.query(q,[req.params.username] ,(err,data)=>{

    if (err) return res.json(err);
    return res.json(data);
  })
})


app.post("/signup", (req, res)=>{
  const q ="INSERT INTO user_data (`username`, `email`, `user_name`, `pass`) values (?)"
  const val =  [req.body.username, req.body.email, req.body.Name, req.body.password];
  console.log(val);

  db.query(q, [val], (err, data)=>{
    if (err) return res.json(err);
    return res.json(data);
  })

})


app.post("/login", (req, res)=>{
  const q ="SELECT * FROM user_data WHERE `username`=? and `pass`=?"
  console.log(req.body.username, req.body.password);

  db.query(q, [req.body.username, req.body.password], (err, data)=>{
    if (err) return res.json(err);
    
    if (data.length>0){
      return res.json("Pass")
    }
    else{
      return res.json("Fail")
    }

  })

})



app.listen(8800, ()=>{
  console.log("Backend good")
})