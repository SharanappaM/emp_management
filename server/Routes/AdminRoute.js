import express from "express"
import con from "../utils/db.js";
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"
import multer from "multer"
import path from "path"


const router = express.Router();




router.post("/adminlogin", (req, res) => {
    const query = "SELECT * FROM admin WHERE email = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password,
    ];

    con.query(query, values, (err, result) => {
        if (err) {
            return res.json({ loginStatus: false, error: "Query error" });
        }
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: "1d" });
            res.cookie("token", token, { httpOnly: true }); // Added httpOnly for security
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, error: "Wrong email or password" });
        }
    });
});

router.get("/listCategorys", (req, res) => {
    const q = "SELECT * FROM category";
    con.query(q, (err, result) => {
        if (err) return res.json({ status: false, msg: "quey error" })
        return res.json({ result })
    })
})



router.get("/getAdmins",(resq, res)=>{
    const q = "SELECT * FROM admin";
    con.query(q, (err,result)=>{
        if(err) return res.json({status:false, msg :"Query error"})
            return res.json({result})
    })
})


router.post("/addCategory", (req, res) => {
    const q = "INSERT INTO category (`name`) VALUES (?)";
    // const q = "INSERT INTO employee (`id`,`des`,`name`,`passwoprd`,`phone`,`sal`) VALUES (?)";


    const values = [
        req.body.category
    ]
    con.query(q, values, (err, result) => {
        if (err) return res.json({ status: false, error: "Query Error" })
        return  
    })
})


// iamge upload 
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/images")
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname +"_"+Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

// end image eupload

router.post("/addEmployees", upload.single("emp_image"), (req, res) => {
    const q = "INSERT INTO employees (`name`,`email`,`password`,`salary`,`address`,`category_id`, `emp_image`) VALUES (?)";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ status: false, error: "Query Error" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.body.category_id,
            req.file.filename ,

        ]

        con.query(q, [values], (err, result) => {
            if (err) return res.json({ status: false, error: "Query Error" })
            return res.json({ status: true, msg: "Category Created" })
        })

    })


  
})


// edit emp

router.put("/editEmployees/:id", (req, res) => {
    const empId = req.params.id;
    const q = "UPDATE  employees SET `name`=? ,`email`=? ,`salary`=?,`address`=?,`category_id`=?  WHERE id=?";
   
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
    ]
    con.query(q,[...values,empId], (err, result) => {
        if (err) return res.json({ status: false, error: "Query Error" })
        return res.json({ status: true, msg: "Categor edited" })
    })
})




router.get("/listCategorys", (req, res) => {
    const q = "SELECT * FROM category";
    con.query(q, (err, result) => {
        if (err) return res.json({ status: false, msg: "quey error" })
        return res.json({ result })
    })
})
router.get("/listEmployees", (req, res) => {
    const q = "SELECT * FROM employees";
    con.query(q, (err, result) => {
        if (err) return res.json({ status: false, msg: "quey error" })
        return res.json({ result })
    })
})

router.delete("/employees/:id",(req,res)=>{
    const empId = req.params.id;
    const q = "DELETE FROM employees WHERE id = ?";
    con.query(q,[empId], (err, data)=>{
        if (err) return res.json({ status: false, msg: "quey error" })
            return res.json({ status: true, msg: "Employee Deleted..! " })
    })
})



router.get("/logout", (req, res)=>{
    res.clearCookie("token")
    return res.json({Status:true})
})

export { router as adminRouter }