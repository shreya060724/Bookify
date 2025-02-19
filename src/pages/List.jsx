import React , {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFirebase} from '../context/Firebase';

const ListingPage = ()=>{

  const [name , setName]= useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");

  const firebase = useFirebase();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    await firebase.handleCreateNewListing(name, isbnNumber , price);
  }

  return(
    <div className="container mt-5">
      <h2>List Book With Bookify!!📒</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder="Enter Book Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN Number</Form.Label>
          <Form.Control onChange={(e)=>setIsbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="ISBN Number" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control onChange={(e)=>setPrice(e.target.value)} value={price} type="text" placeholder="Enter Price of book" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
        
      </Form>
    </div>
  )
}

export default ListingPage;