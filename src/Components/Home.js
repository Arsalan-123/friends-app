import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import "antd/dist/antd.css";
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Navs from './Navs';
import { Upload, message, Button } from 'antd';
import { ProfileFilled, UploadOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Profilebtn from "./Profilebtn"
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "./Firebase"
import { getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { ref } from "@firebase/storage";
import { getDocFromCache } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";











const Home = () => {


  const onFinish = (values) => {

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

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')
  const [data, setData] = useState('')
  const [already, setalready] = useState(false)




  var uid = ''
  auth.onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid
      console.log(uid);
      onSnapshot(doc(db, "users", uid), (doc) => {
        console.log("Current data: ", doc.data());
        if (!already) {
          setData(doc.data())
          setalready(true)
        }
      });
    }
  }
  )

  useEffect(() => {


  }, [])

  async function postSave(url) {

    await setDoc(doc(db, "post", uid), {
      title,
      description,
      imageUrl: url
    });
  }

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

    }

  };
  const handleUpload = () => {

    const storageRef = ref(storage, `images/${image.name}`)

    const uploadTask = uploadBytesResumable(storageRef, image);



    uploadTask.on(
      'state_changed',
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
           console.log('image uploaded', url); postSave(url) 
          })
      }

    )


  };






  return (

    <div >
      <div>  <Navs />    </div>

      <div>

        <div>


        </div>

        <div >

          <div
          >
            <Profilebtn />
            <Avatar size={75} icon={<UserOutlined />} />
          </div>


        </div>






      </div>



      <div className="homepage">
        <h1>{data.username}</h1>

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
            rules={[{ required: true, message: 'Please input your post titile!' }]} onChange={(e) => { settitle(e.target.value) }}

          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your post description!' }]} onChange={(e) => { setdescription(e.target.value) }}

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
            <input type="file" onChange={handleChange} />            <Form.Item>
              <Button className="btn" type="primary" htmlType="submit" onClick={handleUpload}>
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
