import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';


const BookCard = (props) =>{

  const navigate = useNavigate();

  return(
    <Card style={{ width: '25rem', margin: '20px' , border: 'solid 1px', borderRadius: '5px'}}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has title {props.name} and this book is sold by {props.displayName} and it costs Rs.{props.price}
        </Card.Text>
        <Button onClick={e => navigate(props.link)} variant="primary">View</Button>
      </Card.Body>
    </Card>
  )
}

export default BookCard;