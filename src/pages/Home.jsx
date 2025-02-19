import React , {useEffect, useState} from "react";
import {useFirebase} from '../context/Firebase';
import BookCard from "../components/Card";
import CardGroup from 'react-bootstrap/CardGroup';

const HomePage = () =>{

  //context hook instance
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  //book listing function
  useEffect(()=>{
    firebase.listAllBooks().then((books)=> setBooks(books.docs))
  },[]);

  return(
    <div className="conatiner mt-5">
      <CardGroup>
        {books.map((book)=> (
          <BookCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()}/>
        ))}
      </CardGroup>
    </div>
  )
}

export default HomePage;