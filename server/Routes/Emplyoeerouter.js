import express from "express"
import con from "../utils/db.js";
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"
import multer from "multer"
import path from "path"

const router = express.Router();


// router.post("/employeeLogin", (req, res) => {
//     const q = "SELECt * FROM employees WHERE email = ?"
//     const values = [
//         req.body.email,
//     ]

//     con.query(q, values, (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.json({ loginStatus: false, error: "Query error" });
            
            
//         }
//         if (result.length > 0) {

//             bcrypt.compare(req.body.password, result[0].password, (err, response) => {
//                 if (err) {
//                     return res.json({ loginStatus: false, error: "password wrong" });

//                 }
//                 if (response) {
//                     const email = result[0].email;
//                     const token = jwt.sign({ role: "employee", email: email }, "employee_secret_key", { expiresIn: "1d" });
//                     res.cookie("token", token); // Added httpOnly for security
//                     return res.json({ loginStatus: true, id:result[0].id });

//                 }
//             })

         
            

//         } else {
//             return res.json({ loginStatus: false, error: "Wrong email or password" });
//         }
//     });
// })

router.post("/employeeLogin", (req, res) => {
    const sql = "SELECT * from employees Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "employee", email: email, id: result[0].id },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });


router.get("/details/:id", (req, res)=>{
    const id = req.params.id;
    const q = "SELECT * FROM employees where id = ?"
    con.query(q, [id], (err, result)=>{
        if(err) return res.json({Status: false})
        
        return res.json(result)
    })

})


router.get("/logout", (req, res)=>{
    res.clearCookie("token")
    return res.json({Status:true})
})


export { router as employeeRouter }










// import express from "express";
// import con from "../utils/db.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const router = express.Router();

// // Employee Registration (For hashing password before storing)
// router.post("/register", async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.json({ status: false, error: "Email and password are required" });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const query = "INSERT INTO employees (email, password) VALUES (?, ?)";
//         con.query(query, [email, hashedPassword], (err) => {
//             if (err) {
//                 console.error("Database Insert Error:", err);
//                 return res.json({ status: false, error: "Database error" });
//             }
//             res.json({ status: true, message: "Employee registered successfully" });
//         });
//     } catch (error) {
//         console.error("Password Hashing Error:", error);
//         res.json({ status: false, error: "Password hashing error" });
//     }
// });

// // Employee Login
// router.post("/employeeLogin", (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.json({ loginStatus: false, error: "Email and password are required" });
//     }

//     const query = "SELECT * FROM employees WHERE email = ?";
//     con.query(query, [email], (err, result) => {
//         if (err) {
//             console.error("Database Query Error:", err);
//             return res.json({ loginStatus: false, error: "Query error" });
//         }

//         if (result.length === 0) {
//             return res.json({ loginStatus: false, error: "Wrong email or password" });
//         }

//         const hashedPassword = result[0].password;

//         // Compare hashed password using bcrypt
//         bcrypt.compare(password, hashedPassword, (err, response) => {
//             if (err) {
//                 console.error(`Bcrypt Error for email ${email}:`, err);
//                 return res.json({ loginStatus: false, error: "Password comparison error" });
//             }

//             if (response) {
//                 const token = jwt.sign({ role: "employee", email }, "employee_secret_key", { expiresIn: "1d" });

//                 // Secure cookie with httpOnly
//                 res.cookie("token", token, { httpOnly: true });
//                 return res.json({ loginStatus: true, id: result[0].id });
//             } else {
//                 console.log("Password mismatch for:", email);
//                 return res.json({ loginStatus: false, error: "Wrong email or password" });
//             }
//         });
//     });
// });

// export { router as employeeRouter };
