import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {Link} from 'react-router-dom'
import Searchbtn from './Searchbtn';

function Navs() {
    const { Header, Content, Footer } = Layout;
    return (
        <div>
        <Header style={{  zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
             
                <Menu.Item key="1"><Link to="../home">Home</Link></Menu.Item>
                <Menu.Item key="2"> <Link to="../setting"> Setting </Link>   </Menu.Item>
                <Menu.Item key="2">  About  </Menu.Item>
                <Menu.Item key="3">  <Searchbtn/></Menu.Item>  
       
              
           
            </Menu>
           
        </Header>
        {/* <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}></Content> */}
        </div>
    )
}

export default Navs;
