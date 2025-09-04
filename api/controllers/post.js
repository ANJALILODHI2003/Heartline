import { db } from "../db.js";
import jwt from "jsonwebtoken";

// Get all posts
export const getPosts = (req, res) => {
  const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Get single post with user info
export const getPost = (req, res) => {
  const q = `
    SELECT p.id, u.username, p.title, p.desc, p.img, u.img AS userImg, p.cat, p.date
    FROM users u
    JOIN posts p ON u.id = p.uid
    WHERE p.id = ?
  `;
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

// Add post
export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `INSERT INTO posts(title, \`desc\`, img, cat, date, uid) VALUES (?)`;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, date, userInfo.id];

    db.query(q, [values], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

// Delete post
export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

    db.query(q, [postId, userInfo.id], (err) => {
      if (err) return res.status(500).json("You can delete only your post!");
      return res.status(200).json("Post has been deleted!");
    });
  });
};

// Update post
export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "UPDATE posts SET title=?, `desc`=?, img=?, cat=? WHERE id=? AND uid=?";
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, postId, userInfo.id];

    db.query(q, values, (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been updated.");
    });
  });
};
