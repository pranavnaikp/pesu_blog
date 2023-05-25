import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import "./openblog.css"

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllBlogs();
  }, []);

  const formatDateTime = (datetime) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = new Date(datetime).toLocaleDateString(undefined, options);
    const formattedTime = new Date(datetime).toLocaleTimeString();
    return formattedDate + " " + formattedTime;
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <Container className = "maincont" style={{ maxWidth: "80%", margin: "0 auto" }}>
      <Row>
        {blogs &&
          blogs.map((blog) => (
            <Col key={blog?._id} xs={30} md={26} lg={24}>
            <div onClick={() => handleBlogClick(blog._id)} style={{ cursor: "pointer" }}>
              <BlogCard
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={formatDateTime(blog.createdAt)}
              />
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Blogs;
