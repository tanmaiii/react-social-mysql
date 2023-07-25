import {db} from '../connect.js'
import jwt from "jsonwebtoken";
import moment from 'moment'

export const getUser = (req, res) => {
    const userId = req.params.userId;

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, 'secretkey',(err,userInfo) => {
      if (err) return res.status(403).json("Token is not invalid")
  
      const q = `SELECT * FROM users WHERE id = ?`;
    
      db.query(q,[userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const {password, ...info} = data[0]
        return res.status(200).json(info)
      });
    })
}

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not invalid");

    const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? WHERE id=?";

    const values = [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.profilePic,
      req.body.coverPic,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your post!");
    });
  });
}