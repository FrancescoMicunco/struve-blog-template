import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import React, { useEffect, useState } from "react";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/posts`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setPosts(data);
      } else {
        console.error("Fetch Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Row>
      {posts.map((p) => (
        <Col md={4} style={{ marginBottom: 50 }}>
          <BlogItem key={p.id} {...p} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
