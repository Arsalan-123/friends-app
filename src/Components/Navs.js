import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import Searchbtn from './Searchbtn';
import { auth } from './Firebase';
import { signOut } from "firebase/auth";


function Navs() {
    const { Header, Content, Footer } = Layout;

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    
    return (
        <div>
            <Header style={{ zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2"> <Link to="../setting"> Setting </Link>   </Menu.Item>
                    <Menu.Item key="3">  About  </Menu.Item>
                    <Menu.Item key="4"><Link to="/search">Search</Link></Menu.Item>
                    <Menu.Item key="5" onClick={logout}>  Logout  </Menu.Item>
                    <Menu.Item key="6">  <Searchbtn /></Menu.Item>
                </Menu>

            </Header>
            {/* <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}></Content> */}
        </div>
    )
}

export default Navs;
