import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <Container>
      <Row>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Col key={blog?._id} xs={30} md={26} lg={24} className="mb-4">
              <BlogCard
                id={blog._id}
                isUser={true}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog.user.username}
                time={blog.createdAt}
              />
            </Col>
          ))
        ) : (
          <Col>
            <h1>You Haven't Created a Blog</h1>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default UserBlogs;
