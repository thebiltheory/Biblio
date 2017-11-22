import React from 'react';
import * as BooksAPI from './BooksAPI';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookList from './components/organisms/BookList';
import SearchBooks from './components/organisms/SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    allBooks:[],
  }

  componentWillMount() {
    this.getBooks();
  };

  getBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ allBooks: books });
    });
  }

  searchBooks(query, maxResults) {
    return BooksAPI.search(query, maxResults)
      .then((books) => books);
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        console.log(this);
        this.getBooks();
      });
  }

  render() {
    return (
        <Router>
          <div className="app">

            <Route exact path="/" render={() => (
              <BookList
                books={this.state.allBooks}
                onUpdateShelf={this.updateShelf}
                />
            )} />

            <Route exact path="/search" render={() => (
              <SearchBooks
                books={this.state.allBooks}
                onSearch={this.searchBooks}
                onUpdateShelf={this.updateShelf}
                />
            )} />

          </div>
        </Router>
    )
  }
}

export default BooksApp
