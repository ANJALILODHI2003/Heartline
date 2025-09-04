import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/posts${cat || ""}`);
        setPosts(res.data);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              {/*  Cloudinary image direct */}
              {post.img && <img src={post.img} alt={post.title} />}
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
