import React, { Component } from 'react';
import BookShelf from './BookShelf';
import AddFab from '../atoms/AddFab';

export default class BookList extends Component {

  currentlyReading() {
    return this.props.books.filter((book) => {
      return book.shelf === 'currentlyReading';
    });
  }

  wantToRead(){
    return this.props.books.filter((book) => {
      return book.shelf === 'wantToRead';
    });
  }

  read() {
    return this.props.books.filter((book) => {
      return book.shelf === 'read';
    });
  }

  render() {
      const { books } = this.props;
      const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
      const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
      const read = books.filter((book) => book.shelf === 'read');
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelf="Currently Reading"
              books={currentlyReading}
              onUpdateShelf={this.props.onUpdateShelf} />

            <BookShelf
              shelf="Want to Read"
              books={wantToRead}
              onUpdateShelf={this.props.onUpdateShelf} />

            <BookShelf
              shelf="Read"
              books={read}
              onUpdateShelf={this.props.onUpdateShelf} />
          </div>
        </div>
        <AddFab />
      </div>
    )
  }
}
