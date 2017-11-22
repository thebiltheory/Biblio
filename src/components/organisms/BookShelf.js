import React, { Component } from 'react';
import Book from '../atoms/Book';
// import * as BooksAPI from '../../BooksAPI';

export default class BookShelf extends Component {

  render() {
    console.log(this.props.books);
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) =>
              <li key={book.id}>
                <Book
                  title={book.title}
                  bookItem={book}
                  onUpdateShelf={this.props.onUpdateShelf}
                  author={book.authors}
                  cover={book.imageLinks.thumbnail}
                  shelf={book.shelf} />
                </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}
