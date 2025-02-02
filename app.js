const express=require('express')
const mongoose=require('mongoose');
const app=express()

const faqrouter=require('./routes/faq')
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });

const db=mongoose.connection;

db.on('error',(error)=>{
  console.log(error)
})

db.once('open',()=>{
  console.log("connected to database")
})

app.use(express.json());
app.use('/faqs',faqrouter);

app.listen(3000,()=>{
  console.log('server started on port 3000');
})