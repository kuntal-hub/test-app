const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const express = require('express')
const puppeteer = require('puppeteer');
var cors = require('cors')
require('dotenv').config({path:"./.env"})
const app = express()
const port = 3000


cloudinary.config({ 
  cloud_name: "dvrpvl53d", 
  api_key: "688949538241537", 
  api_secret: "5gCzmGgeJzumFCCmqqzLISqJ2mo"
});

const uploadOnCloudinary=async (localFilePath)=>{
    try {
        if (!localFilePath) return null; 
        //upload file on cloudinary
        const uploadedResponse=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"});
        //remove file from local storage
        fs.unlinkSync(localFilePath);
        return uploadedResponse;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        //remove file from local storage
        return null;
    }
}


async function htmlToImage(outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the HTML content of the page

  await page.goto('https://mega-blog-coral.vercel.app/');

  // Capture a screenshot of the page
  await page.screenshot({ path: outputPath });

  // Close the browser
  await browser.close();

  const data = await uploadOnCloudinary(outputPath);
  return data;
}

// Example usage



app.use(cors({
  origin:"*",
  credentials:true
}))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login',(req,res)=>{
    res.send("plese login first")
})

app.get('/signup',(req,res)=>{
    res.send("<h1>please sign up</h1>")
})
app.get('/api',(req,res)=>{
  const outputPath = 'output.png';

  htmlToImage(outputPath)
    .then((data) => res.json(data))
    .catch((error) => console.error('Error:', error));
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})


// const jwt = require('jsonwebtoken');
// const payload = { userId: '123', username: 'john_doe' };
// const secretKey = 'your_secret_key_here';
// const expiresIn = 10 * 60;
// try {
//   const token1 = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiX2lkIjoieWR5amh0Z3JzIiwiaWF0IjoxNzA0OTczNjYyLCJleHAiOjE3MDQ5NzQ1NjJ9.FHMWCrMt5xERc0Pvtw02Zj0-vEhMFQ86hsCcMHItbu0","secretgodfuodeyskijdyl");
//   const token2 = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiX2lkIjoieWR5amh0Z3JzIiwiaWF0IjoxNzA0OTczNjM5LCJleHAiOjE3MDQ5NzQ1Mzl9.yw4sURDbwGLZEM3R-xsW2I1ea8tr-wxRl56GfE2qv9Q","secretgodfuodeyskijdyl");
//   console.log(token1)
//   console.log(token2)
//   token1===token2 ? console.log("same"):console.log("not same")
// } catch (error) {
//   console.log(error)
// }


// const token =jwt.sign({
//   data: 'foobar',_id:"ydyjhtgrs"
// }, 'secretgodfuodeyskijdyl', { expiresIn: '15m' });

// console.log(token);


