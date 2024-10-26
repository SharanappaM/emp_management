import express from "express"
import con from "../utils/db.js";
import jwt from "jsonwebtoken"


const router = express.Router();


// router.post("/adminlogin", (req, res) => {
//     // console.log(req.body);

//     // const q = "SELECT * from admin Where email = ? and  password = ? ";
//     const query = "SELECT * FROM admin WHERE email = ? AND password = ?";
//     const values = [
//         req.body.email,
//         req.body.password,
//     ]
//     con.query(query, [values], (err, result) => {
//         if (err) return res.json({ loginStatus: false, Error: "Query error" })
//         if (result.length > 0) {
//             const email = result[0].email;
//             const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: "1d" })
//             res.cookie("token",token)
//             return res.json({ loginStatus: true })
//         }
//         else{
//             return res.json({ loginStatus: false, Error: "Wrong email or password" })
//         }
//     })

// })


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


export { router as adminRouter }