import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../atoms/Book';

export default class SearchBooks extends Component {

  state = {
    books: [],
    search: '',
    results: [],
  }

  componentWillMount() {
    console.log(this.props.books);
    this.setState({books: this.props.books});
  }

  searchTerm = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    this.setState({ search: e.target.value });

    this.props.onSearch(e.target.value, 20)
      .then((books) => {
        this.setState({ results: books });
      })
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
              onChange={this.searchTerm}
              />
          </div>
        </div>
        <div className="search-books-results">
        {this.state.results.length > 0 &&
          <article>
          <h2> Your results for {this.state.search} </h2>
          <ol className="books-grid">
          {this.state.results.map((book) =>
            <Book
              key={book.id}
              title={book.title}
              bookItem={book}
              onUpdateShelf={this.props.onUpdateShelf}
              author={book.authors}
              cover={book.imageLinks.thumbnail}
              shelf='none'
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
