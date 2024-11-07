import express from "express"
import cors from "cors"
import { adminRouter } from "./Routes/AdminRoute.js"
import { employeeRouter } from "./Routes/Emplyoeerouter.js"


const app = express()

app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST", "GET", "DELETE", "PUT"],
    credentials:true
}))
app.use(express.json())
app.use("/auth", adminRouter)
app.use("/emplyoee", employeeRouter)
app.use(express.static("public"))



app.get("/getemp",(req, res)=>{
    return res.json("Hello Employes")
    
})



app.listen(5050,()=>{
    console.log("Sever running");
    
})