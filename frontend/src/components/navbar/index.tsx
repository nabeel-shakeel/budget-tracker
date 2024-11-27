import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Item } = Menu

export default function Navbar(){
  return (
   <Layout>
     <Menu mode="horizontal">
      <Item key="home">
        <Link to="/">Home</Link>
      </Item>
      <Item key="about">
        <Link to="/about">About</Link>
      </Item>
        <Item key="posts">
        <Link to="/posts">Test React Query</Link>
      </Item>
      <Item key="login">
        <Link to="/login">Login</Link>
      </Item>
    </Menu>
  </Layout>
  );
};

