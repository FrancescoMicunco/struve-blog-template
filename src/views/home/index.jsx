import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list";
import "./styles.css";

const Home =()=>{
    return (
      <Container fluid="sm" style={{marginTop:80}}>
        <Row>
        <h1 className="blog-main-title mt-5">Welcome to the Strive Blog!</h1>
        <BlogList />
        </Row>
      </Container>
    );
  }
export default Home