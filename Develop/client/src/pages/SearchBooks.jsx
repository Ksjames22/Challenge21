import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row, Alert } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { SAVE_BOOK } from "../graphql/mutations";
import { SEARCH_BOOKS } from "../graphql/queries"; // Make sure SEARCH_BOOKS is defined

const getSavedBookIds = () => {
  const savedBooks = localStorage.getItem('savedBooks');
  return savedBooks ? JSON.parse(savedBooks) : [];
};

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  }, [savedBookIds]);

  const [saveBook] = useMutation(SAVE_BOOK);

  // Query for searching books
  const { loading, data } = useQuery(SEARCH_BOOKS, {
    variables: { searchInput },
    skip: !searchInput,
  });

  useEffect(() => {
    if (data && data.searchBooks) {
      const bookData = data.searchBooks.map((book) => ({
        bookId: book.bookId,
        authors: book.authors || ['No author to display'],
        title: book.title,
        description: book.description,
        image: book.image,
      }));

      setSearchedBooks(bookData);
    }
  }, [data]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) return false;
    
    // Reset the searched books if searchInput changes
    setSearchedBooks([]);
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;

    try {
      const { data } = await saveBook({
        variables: { input: bookToSave },
      });

      if (data.saveBook) {
        setSavedBookIds([...savedBookIds, bookToSave.bookId]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save the book.");
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg' disabled={loading}>
                  {loading ? 'Searching...' : 'Submit Search'}
                </Button>
              </Col>
            </Row>
            {error && <Alert variant='danger'>{error}</Alert>}
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border='dark'>
                {book.image && (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;




