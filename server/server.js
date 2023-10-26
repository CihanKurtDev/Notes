import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import path from 'path'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
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

function checkToken( req ,res ,next ){
  const accessToken = req.cookies.accessToken
  if (!accessToken) {
    return res.status(401).json({ message: 'Access token not found', isAuthorized: false })
  }
  jwt.verify(accessToken, process.env.VITE_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      req.tokenSuccess = false
      return res.status(401)
    } else {
      req.tokenSuccess = true
      req.decodedToken = decoded
      next()
    }
  });
}

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
          resolve(row)
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
    return res.status(401).json({ message: "Invalid Password", error});
  }
});

app.get('/Logout', (req, res) => {
  res.clearCookie('accessToken', { httpOnly: true })
  res.json({success: true, message: "Logout Success"})
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

app.get('/Notes',checkToken, async (req, res) => {
  const { userId } = req.decodedToken;

  db.all("SELECT * FROM Notes where userId = ?", [userId], (err, rows) => {
    if(err) return res.status(403).json({message: "Get error"})
    res.status(200).json({message: "Notes received", isAuthorized: true, rows})
  })
});

app.post('/Notes', checkToken, (req, res) => {
  const { userId } = req.decodedToken
  const { content, date, id, time, title, folderId } = req.body

  function insertNote() {
    db.run("INSERT INTO Notes(userId, content, date, time, title) VALUES(?, ?, ?, ?, ?)", [userId, content, date, time, title || null], function (err) {
      if (err) {
        return res.status(403).json({ message: "Insert error", err })
      } else {
        const noteId = this.lastID || 0
        if (folderId) {
          db.run("INSERT INTO NotesInFolder(noteId, folderId, userId) VALUES(?, ?, ?)", [noteId, folderId, userId], (err) => {
            if (err) console.error("Insert error into NotesInFolder", err)
          })
      }
      res.status(200).json({ message: "Note inserted", id: noteId })
      }
    })
  }

  db.get("SELECT id FROM Notes WHERE id = ? AND userId = ?", [id, userId], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Select error" })
    }
    if (row) {
      db.run("UPDATE Notes SET content = ?, date = ?, time = ?, title = ? WHERE id = ? AND userId = ?", [content, date, time, title || null, id, userId], function (err) {
        if (err) return res.status(403).json({ message: "Update error", err })
        res.status(200).json({ message: "Update successful", id })
      });
    } else {
      insertNote()
    }
  })
})

app.get('/Notes/:id',checkToken, async (req, res) => {
  const { userId } = req.decodedToken;
  const {id} = req.params 

  db.get("SELECT * FROM Notes where userId = ? AND id = ?", [userId, id], (err, row) => {
    if(err) return res.status(403).json({message: "Note not found"})
    res.status(200).json({message: "Note found", row})
  })
});

app.post('/Notes/:id',checkToken, async (req, res) => {
  const { userId } = req.decodedToken;
  const {id} = req.params 

  db.get("DELETE FROM Notes where userId = ? AND id = ?", [userId, id], (err, row) => {
    if(err) return res.status(403).json({message: "Note not found"})
    res.status(200).json({message: "Note deleted", row})
  })
});

app.get("/Folders", checkToken, (req, res) =>  {
  const { userId } = req.decodedToken;

  db.all("SELECT * FROM Folders WHERE userId = ?", [userId], (err, rows) => {
    if(err) return res.status(403).json({message: "Folder(s) not found"})
    res.status(200).json({message: "Folder(s) selected", rows})
  })
})

app.post("/Folders", checkToken, (req, res) => {
  const { userId } = req.decodedToken;
  const {folderName, notes} = req.body;

  db.run("INSERT INTO FOLDERS(userId, name) VALUES(?, ?)",[userId, folderName], function(err) {
    if(err) return res.status(403).json({message: "Couldnt create Folder", err})

    db.serialize(() => {
      notes.forEach((id) => {
        db.run(`INSERT INTO NotesInFolder (noteId, folderId, userId) VALUES(?, ?, ?)`, [id, this.lastID, userId], (err) => {
          if(err) return res.status(403).json({message: "INSERT error"})
        })
    })
    res.status(200).json({message: "Folder inserted"})
  })
  })
}) 

app.post("/NotesInFolder", checkToken, (req, res) => {
  const { userId } = req.decodedToken;
  const { folderId, notes } = req.body;

  db.serialize(() => {
    notes.forEach((noteId) => {
      db.run(
        `INSERT INTO NotesInFolder (noteId, folderId, userId) VALUES (?, ?, ?)`,
        [noteId, folderId, userId],
        (err) => {
          if (err) {
            return res.status(403).json({ message: "INSERT error" });
          }
        }
      );
    });
    res.status(200).json({ message: "Notes added to folder" });
  });
});

app.get("/NotesInFolder/:id", checkToken, (req, res) => {
  const { userId } = req.decodedToken;
  const {id} = req.params

  db.all("Select * From NotesInFolder WHERE userId = ? and folderId = ?", [userId, id], (err, rows) => {
    if(err) return res.status(403).json({message: "Select error"})
    res.status(200).json({message: "Select successfull", rows})
  })
})

app.post("/deleteFolders", checkToken, (req, res) => {
  const { userId } = req.decodedToken;
  const {folder} = req.body;

  db.run("DELETE FROM NotesInFolder WHERE userId = ? AND folderId = ?",[userId, folder.id], (err) => {
    if(err) return res.status(403).json({message: "Delete error", err})
  })

  db.run("DELETE FROM Folders WHERE userId = ? AND id = ?",[userId, folder.id], (err) => {
    if(err) return res.status(403).json({message: "Delete error", err})
    res.status(200).json({message:"Folder Deleted"})
  })
})  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})