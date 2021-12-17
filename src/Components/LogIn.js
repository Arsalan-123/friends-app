import React, { useState } from 'react'

import { Form, Input, Button, Checkbox } from 'antd';
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, auth } from "./Firebase"
import {  useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db } from './Firebase';




const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  

    
    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    let navigate = useNavigate();


    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
          localStorage.setItem('currentUser',JSON.stringify(user))
          console.log(user)
          navigate("/home");
        })
        .catch((error) => {
          console.log("error")
        });
      
    }
  

    async function loginUser () {

  
      const docRef = await addDoc(collection(db,  "users" ), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    
    }
    
    



return (

  <div className = "signup-form  formset">

<h1 >Log In</h1>
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
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
                    <Input   onChange={(e) => setEmail(e.target.value)} className  = "input"/>

      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input   onChange={(e) => setPassword(e.target.value)}className  = "input"/>
 
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 11, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
        <Button  onClick={handleLogin}  className = "btn" type="primary" htmlType="submit">
        Log In

        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};



export default Login;