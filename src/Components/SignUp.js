import { Form, Input, Button, Checkbox } from 'antd';
import "antd/dist/antd.css";
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, auth, db } from "./Firebase"
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useState } from 'react';



const SignUp = () => {
  var uid = ''

  auth.onAuthStateChanged((user) => {
    uid = user.uid
    console.log(uid)
  })
  const [username, setausername] = useState("");
  const [useremail, setauseremail] = useState("");
  const [userpassword, setuserpassword] = useState("");


  let navigate = useNavigate();


  const onFinish = (values) => {

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        createUser();
        setDoc(doc(db, "users", uid), {
          username,
          email: useremail,
          password: userpassword
        })
        navigate("/home");
      });



    console.log('Success:', values);

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  async function createUser() {


    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);

  }


  return (
    <div className="signup-form  formset">


      <h1>SignUp</h1>
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
          label="Username "
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]} onChange={(e) => { setausername(e.target.value) }}
        >
          <Input className="input" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]} onChange={(e) => { setauseremail(e.target.value) }}>
          <Input className="input" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]} onChange={(e) => { setuserpassword(e.target.value) }}>

          <Input className="input" />

        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 11, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>

          <Button className="btn" type="primary" htmlType="submit">
            SignUp
          </Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button className="btn" type="primary" htmlType="submit">
            <Link to='Login'>LogIn</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};



export default SignUp;
