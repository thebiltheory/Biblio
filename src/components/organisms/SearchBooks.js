import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../atoms/Book';

export default class SearchBooks extends Component {

  state = {
    books: [],
    search: '',
    results: [],
  }

  componentWillReceiveProps(props) {
    this.setState({ books: props.books });
  }

  componentWillMount() {
    this.timer = null;
  }

  searchTerm = (search) => {

    const myBooks = new Map();
    this.state.books.forEach((book) => myBooks.set(book.id, book));

    if (search) {
      this.props.onSearch(this.state.search, 20)
      .then((books) => {

        const results = books.map((book) => {
          return myBooks.has(book.id) ? myBooks.get(book.id) : Object.assign(book, { shelf: 'none' });
        })

        this.setState({ results })
      })
    }
  }

  myBooks = () => {
    const myBooks = new Map();
    this.state.books.forEach((book) => myBooks.set(book.id, book.shelf));
    console.log(this);
    return myBooks;
  };


  handleChange = (e) => {
    e.preventDefault();

    clearTimeout(this.timer);

    this.setState({ search: e.target.value });

    this.timer = setTimeout(this.searchTerm(true), 1000);
  }

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.searchTerm();
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'> Close </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.search}
              onChange={this.handleChange}
              onKeyDown={this.handleEnter}
              />
          </div>
        </div>
        <div className="search-books-results">
        {this.state.results.length > 0 &&
          <article>
          <h2> {this.state.results.length} books found for "{this.state.search}" </h2>
          <ol className="books-grid">
          {this.state.results.map((book) =>
            <Book
              key={book.id}
              title={book.title}
              bookItem={book}
              onUpdateShelf={this.props.onUpdateShelf}
              author={book.authors}
              cover={book.imageLinks.thumbnail}
              shelf={book.shelf}
              />
            )}
          </ol>
          </article>
        }
          <h2> All your books </h2>
          <ol className="books-grid">
          {this.props.books.map((book) =>
              <Book
                key={book.id}
                title={book.title}
                bookItem={book}
                onUpdateShelf={this.props.onUpdateShelf}
                author={book.authors}
                cover={book.imageLinks.thumbnail}
                shelf={book.shelf}
                />
          )}
          </ol>
        </div>
      </div>
    )
  }
}
