import React, { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";

import BlogComments from "../../components/blog/blog-comment";
import "./styles.css";
import { useParams, useNavigate } from "react-dom";

const Blog = () => {
  const { blogId } = useParams();

  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/blogs/${blogId}`
      );
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } else if (response.status === 404) {
        navigate("/404");
      } else {
        console.log("Fetch Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/blogs/${blogId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        navigate("/");
      } else {
        console.error("fetch failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="blog-details-root">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <div className="d-flex justify-content-between my-5">
            <h1 className="blog-details-title my-0">{blog.title}</h1>
            <div className="d-flex">
              <button
                className="btn btn-success mr-3"
                onClick={() => navigate(`/blog/${blogId}/edit`)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger ml-3"
                onClick={handleDeleteBlog}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div style={{ marginTop: 20 }}>
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>

          <div className="d-flex justify-content-between">
            <h6 className="mt-4">Comments:</h6>
            <p className="mb-1">Add Comment</p>
          </div>
          {blog.comments.map((b, idx) => (
            <BlogComments key={idx} data={b} />
          ))}
        </Container>
      )}
    </div>
  );
};
export default Blog;
