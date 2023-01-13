const express=require("express")
const app=express()
const mongoose=require("mongoose")
app.use(express.json());
//const url='mongodb://0.0.0.0:27017/adarsh'
mongoose.connect("mongodb://0.0.0.0:27017/amit",{
    // useNewUrlParser:true,
    // useUnifiedTopology:true 
},(err)=>{
    if(!err){
        console.log("conneced to db")
    }else{
        console.log("error")
    }
})

const sch={
    name:String,
    email:String,
    id:Number
}
const monmodel=mongoose.model("sa",sch);

app.post("/post",async(req,res)=>{
    console.log("inside post request");
    const data=new monmodel({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id
    })
     
     const val=await data.save();
     res.json(val);
 })
 app.get('/fetch/:id',function(req,res){
    fetchid=req.params.id;
    monmodel.find(({id:fetchid}),function(err,val){
        if(err){
            res.status(500).send("data is not found")
        }else{
            console.log("data fetch successfully")
            res.send(val);
        }
    })
})

app.put("/update/:id",async(req,res)=>{
       var upname=req.params.name;
       var upemail=req.params.email;
       var upid=req.params.id;
       monmodel.findOneAndUpdate({id:upid},{$set:{name:upname,email:upemail}},{new:true},(err,data)=>{
        if(data==null){
            res.send("nothing found")
        }else{
            res.send(data)
        }
       })
})

app.delete("/del/:id",function(req,res){
    var delid=req.params.id;
    monmodel.findOneAndDelete(({id:delid}),function(err,data){
        if(data==null){
            res.send("Wrong id")
        }else{
        res.send(data);
        }
    })
})

app.listen(3000,()=>{
    console.log("server start at port 3000");
})