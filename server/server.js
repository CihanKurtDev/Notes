import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
const app = express()
const port = 3000
const db = new sqlite3.Database(path.join(path.dirname(fileURLToPath(import.meta.url)), 'db', 'notes.db'))

app.use(cookieParser());   
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json());   

app.post('/', async (req, res) => {
  const { name, password } = req.body

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password needed' });
  }

  try {
    const row = await new Promise((resolve, reject) => {
      db.get("SELECT name, password, id FROM User WHERE name = ?", [name], (err, row) => {
        if (err) {
          reject(err)
        } else if (row) {
          console.log(row)
          resolve(row)
        } else {
          reject()
        }
      })
    })
    const isAuth = await bcrypt.compare(password, row.password);
    if (isAuth) {
      const user = { name: row.name, userId: row.id }
      const accessToken = jwt.sign(user,process.env.VITE_ACCESS_TOKEN_SECRET)
      res.cookie("accessToken", accessToken, {
        domain: "localhost",
        httpOnly: true,
        path: "/",
      })
      return res.json({ success: true, message: 'Login successful', user });
    }
    return res.status(401).json({ success: false, message: 'Invalid login credentials' });
  } catch(error) {
    return res.status(401).json({ message: "Invalid Password"});
  }
});

app.post('/Registration', (req, res) => {
  const { name, password, email } = req.body;
  
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if(err) console.log(err)
        db.run("INSERT INTO User(name, password, email) VALUES(?, ?, ?)", [name, hash, email], async (err) => {
          if (err) return res.status(500).json({ success: false, message: 'Internal server error' });
          return res.status(200).json({ message: 'Registration success' });
        });
      });
  }); 
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})