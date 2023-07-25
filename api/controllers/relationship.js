import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getFollower = (req, res) => {
  const q = `SELECT followerUserId FROM relationships WHERE followedUserId = ?`;
  db.query(q, [req.query.followedUserId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(relationship => relationship.followerUserId));
  });
};

export const getFollowing = (req, res) => {
  const q = `SELECT followedUserId FROM relationships WHERE followerUserId = ?`;
  db.query(q, [req.query.followerUserId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(relationship => relationship.followedUserId));
  });
};

export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not invalid");
  
      const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)";
  
      const values = [
        userInfo.id,
        req.body.userId
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Following has been created!");
      });
    });
};

export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not invalid");
  
      const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
  
      db.query(q, [ userInfo.id ,req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("delete Following has been created!");
      });
    });
};
