import express from "express"
import con from "../utils/db.js";
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"
import multer from "multer"
import path from "path"

const router = express.Router();


router.post("/emplyoeeLogin", (req, res) => {
    const q = "SELECt * from employees WHERE email=?"
    const values = [
        req.body.email,
    ]

    con.query(q, values, (err, result) => {
        if (err) {
            return res.json({ loginStatus: false, error: "Query error" });
        }
        if (result.length > 0) {

            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) {
                    return res.json({ loginStatus: false, error: "password wrong" });
                }
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign({ role: "employee", email: email }, "employee_secret_key", { expiresIn: "1d" });
                    res.cookie("token", token); // Added httpOnly for security
                    return res.json({ loginStatus: true });

                }
            })

        } else {
            return res.json({ loginStatus: false, error: "Wrong email or password" });
        }
    });
})

export { router as employeeRouter }