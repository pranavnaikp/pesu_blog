import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "./openblog.css"

const OpenBlog = () => {
  const [blog, setBlog] = useState(null);
  const { blogId } = useParams();

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${blogId}`);
      if (data?.success) {
        setBlog(data?.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const formatDateTime = (datetime) => {
    const options = { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
    const formattedDate = new Date(datetime).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    // <Container style={{ maxWidth: "80%", margin: "0 auto" }}>
    //   <Row>
    //     <Col>
    //       <Image src={blog?.image} alt={blog?.title} fluid />
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col>
    //       <h1>{blog?.title}</h1>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col>
    //       <p>{blog?.description}</p>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col>
    //       <p>Created at: {formatDateTime(blog?.createdAt)}</p>
    //     </Col>
    //   </Row>
    // </Container>
    <>
    <div className="cont">
        <img className="Mimg" src={blog?.image}/>
        <div className="title">
            <h1>{blog?.title}</h1>
        </div>
        <div className="desc">
            <h5>
            {blog?.description}
            </h5>
        </div>
    </div>

    </>
  );
};

export default OpenBlog;
