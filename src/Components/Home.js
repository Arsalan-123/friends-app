import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import "antd/dist/antd.css";
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Navs from './Navs';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox } from 'antd';
import { useState } from 'react';




const Home = () => {
  const onFinish = (values) => {
    //const file = values.upload[0];
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };




  return (

    <div >
      <div>  <Navs />    </div>
      <div>
        <h1><hamdlerUser /></h1>
        <h2></h2>
      </div>



      <div className="homepage">
        <h1>User Name</h1>

        <Form
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 5 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Post Title "
            name="post title"
            rules={[{ required: true, message: 'Please input your post titile!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your post description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >

            {/* <Upload onChange={(e) => { console.log(e.target); }} name="logo" listType="picture" accept="image/*" multiple={false}
              maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>, */}
            <input type="file" onChange={(e) => { console.log(e.target.files); }} />            <Form.Item>
              <Button className="btn" type="primary" htmlType="submit">
                Post
              </Button>

            </Form.Item>

          </Form.Item>

          <div className="postdiv" >

            <h2>Post Title</h2>
            <hr />
            <h6>Description</h6>

            <img width="250" height="260" src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" />

          </div>


        </Form>




      </div>




    </div>


  )
}

export default Home;
