// import express from 'express';

// const app=express();


// app.use(express.json());

//  app.get("/",(req,res)=>{
//     res.send("home");
//  });

// app.post("/student",(req,res)=>{
//      console.log(req.body);
//     //  res.send("student received")
// res.send("received");
     
// })



//  app.get("/about", (req, res) => {
//     res.send("ℹ️ About Page");
// });

// // Contact Route
// app.get("/contact", (req, res) => {
//     res.send("📞 Contact Page");
// });

// app.get("/nav",(req,res)=>{
//     res.send("nav");
// });

// app.get("/skills",(req,res)=>{

//     res.send("My skills");
// });


// //making of port in express
// const port=process.env.PORT || 3000;
// app.listen(port,()=>{

//      console.log(`Server running on port ${port}`);
// });


// import express, { json } from 'express';


// const app=express();

// app.use(express.json());



// const port=process.env.PORT || 1000;
// app.listen(port,()=>{
// console.log(`Server running on port ${port}`);
// })

import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express from 'express';
dotenv.config();

console.log(process.env.GEMINI_API_KEY);
const app=express();
app.use(cors());

app.use(express.json());
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: message,
        });

        res.json({
            reply: response.text,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});


const port=process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`server is running ${port}`);
    
})