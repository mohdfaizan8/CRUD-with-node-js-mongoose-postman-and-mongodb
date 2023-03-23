const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());


//Databse connection  and User is database name
mongoose.connect("mongodb://localhost:27017/User", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

// schema

const sch={
    name:String,
    email:String,
    id:Number
}

// Messages is collection name 
const monmodel = mongoose.model("Messages",sch);



// post
app.post("/post",async(req,res)=>{
    console.log("inside post function");

    const data = new monmodel({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id
    })

    const val= await data.save();
    res.json(val);
})



//  PUT 
app.put("/update/:id", async function(req, res) {
     upname = req.body.name;
     upemail = req.body.email;
     upid = req.params.id;
  
    try {
      const updatedDoc = await monmodel.findOneAndUpdate(
        { id: upid },
        { $set: { name: upname, email: upemail } },
        { new: true }
      );
      res.json(updatedDoc);
    } catch (error) {
      console.log(error, "this is an error");
    }
  });



  // fetch data
  app.get("/fetch/:id", function(req, res) {
    const fetchid = req.params.id;
    monmodel.findOne({ id: fetchid })
      .then(val => {
        if (val) {
          res.send(val);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500); // or return an error message to the client
      });
  });
  
  

// Delete 
app.delete("/del/:id", function(req, res) {
    const deleteid = req.params.id;
    monmodel.findOneAndDelete({ id: deleteid })
      .then(val => {
        if (val) {
          res.send(val);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });
  



app.listen(3000,()=>{
    console.log("On port no 3000")
})