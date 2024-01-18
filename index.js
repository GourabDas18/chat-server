const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;
admin.initializeApp({databaseURL: 'https://chat-room-2f8a3.firebaseio.com',
credential: admin.credential.cert({
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g,'\n',),
    "client_email": `${process.env.CLIENT_EMAIL}`,
    "project_id": `${process.env.PROJECT_ID}`
})});
app.use(cors({ origin: ["http://localhost:5000", "https://sancho.netlify.app"] }));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.post('/send',(req,res)=>{
    const send_message = {
        notification: {
            title: req.body.name,
            body: req.body.message,
          },
        token: req.body.id,
      };
      admin.messaging().send(send_message).then(val=>{console.log(val);
        res.send("Done")
    
    }).catch(error=>{console.log(error)});
   
})

app.listen(port,()=>{
    console.log("server running");
})