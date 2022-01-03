import React from 'react'
import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import Navs from './Navs';
import { Checkbox } from 'antd';
import { DatePicker, } from 'antd';
import { InputNumber } from 'antd';
import { useState } from 'react';
import { auth, db } from "./Firebase"
import { collection, addDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import Profilebtn from "./Profilebtn";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";



const Setting = () => {


  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  var uid = ''
  auth.onAuthStateChanged((user) => {
    uid = user.uid
  })


  // const Updateprofile = () => {
  //   let uid = auth.currentUser.uid
  //   const [info, setinfo] = useState({})

  //   const inputhandler = (event) => {
  //     const name = event.target.name;
  //     const value = event.target.value
  //     setinfo({ ...info, [name]: value })
  //     // console.log({[name] : value})
  //   }
  //   const updatehandler = () => {
  //     Firestore.collection('profile').doc(uid).update({
  //       bio: info.bio,
  //       name: info.name
  //     })
  //   }





  //   const [keyboard, setKeyboard] = React.useState(true);

  const [ausername, setausername] = useState("");
  const [auseremail, setauseremail] = useState("");






  async function handlerUser() {


   

    const myData = doc(db, "users",uid );
    
    // Set the "capital" field of the city 'DC'
    await updateDoc(myData, {
      username: ausername,
      email: auseremail
      
    });

  }


  







  return (
    <div>
      <div>  <Navs /> </div>

      
      <div className="settingform"  >

        <h1> General Account Settings </h1>


        <div  className='profilePic'>
            <Profilebtn />
            <Avatar size={75} icon={<UserOutlined />} />
          </div>


        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}

          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item

            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]} onChange={(e) => { setausername(e.target.value) }}


          ><Input />

          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]} onChange={(e) => { setauseremail(e.target.value) }}


          >
            <Input />
          </Form.Item>
          <Form.Item
            label=" Change Password"
            name="password"
            rules={[{ required: true, message: 'Please input your new  password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Gender"
            wrapperCol={{ span: 5 }}
          >
            <Select>
              <Select.Option value="demo">Male</Select.Option>
              <Select.Option value="demo">Female</Select.Option>


            </Select>
          </Form.Item>
          <Form.Item
            label="Date Of Birth"
            name="date of birth"
            rules={[{ required: true, message: 'Please input your date of birth!' }]}
          >
            <Space direction="vertical">
              <DatePicker />
            </Space>
          </Form.Item>









          <Form.Item label="Contact"
          >
            <InputNumber />
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={handlerUser} className="btn" type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
};


export default Setting;