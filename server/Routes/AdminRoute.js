import express from "express"
import con from "../utils/db.js";
import jwt from "jsonwebtoken"


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

router.post("/", (req, res) => {
    const q = "INSERT INTO category (`name`) VALUES (?)";
    // const q = "INSERT INTO employee (`id`,`des`,`name`,`passwoprd`,`phone`,`sal`) VALUES (?)";

    const values = [
        raddCategoryeq.body.category
    ]
    con.query(q, values, (err, result) => {
        if (err) return res.json({ status: false, error: "Query Error" })
        return res.json({ status: true, msg: "Category Created" })
    })
})



router.get("/listCategorys", (req, res) => {
    const q = "SELECT * FROM category";
    con.query(q, (err, result) => {
        if (err) return res.json({ status: false, msg: "quey error" })
        return res.json({ result })
    })
})



export { router as adminRouter }