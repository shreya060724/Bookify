import React ,{useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const BookDetailPage = () =>{

  //this param will store the book id
  const params = useParams();

  //instance to use our custom hook
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);

  const [data, setData]= useState(null);

  useEffect(()=>{
    firebase.getBookById(params.bookId).then((value)=> setData(value.data()) )
  },[])

  const placeOrder =  async()=>{
    const result = await firebase.placeOrder(params.bookId, qty);
  }

  if(data== null) return <h1>Loading...</h1>

  return(
    <div className="container">
      <h1>{data.name}</h1>
      <h2>Details:</h2>
      <p>Price Rs.{data.price}</p>
      <p>ISBN Num: {data.isbn}</p>
      <h2>Owner Details</h2>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Qunatity</Form.Label>
          <Form.Control onChange={(e)=>setQty(e.target.value)} value={qty} type="number" placeholder="Quantity" />
        </Form.Group>
      <Button onClick={placeOrder} variant="success">Buy Now</Button>
    </div>
  )
}

export default BookDetailPage;