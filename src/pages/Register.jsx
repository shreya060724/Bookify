import React , {useState , useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFirebase} from '../context/Firebase';
import { useNavigate } from "react-router-dom";

const RegisterPage = () =>{

  //using fn created in firebase.jsx here using context hooks
  const firebase = useFirebase();

    //instance to use navigate fn
    const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
    //use effect fn to check whether user is already logged in or not when at first componenet gets mounted
    useEffect(()=>{
      if(firebase.isLoggedIn){
        //navigate to home page
        navigate('/');
      }
    },[firebase, navigate])

  //fn for submit button
  const handleSubmit =  async(e)=>{
    e.preventDefault();
    console.log("Signing user")
     const result = await firebase.signupUserWithEmailAndPassword(email,password);
     console.log("result: ",result)
  }

  return(
    <div className="container mt-5">
      <h2>Sign Up With Bookify!!📒</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  )
}

export default RegisterPage;