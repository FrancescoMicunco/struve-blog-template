import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import React, { useEffect, useState } from "react";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/posts`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        console.error("Fetch Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Row>
      {blogs.map((blog) => (
        <Col md={4} style={{ marginBottom: 50 }}>
          <BlogItem key={blog.id} {...blog} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
