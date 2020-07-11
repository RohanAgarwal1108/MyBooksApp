import React, {Component} from 'react';
import Book from './Book';

class BookShelf extends Component {
    render(){
      const booklist=this.props.booklist;
      const shelf=['currentlyReading', 'wantToRead', 'read'];
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  {shelf.map((shelf_item)=>
                    booklist.filter((book)=>book.shelf===shelf_item).length!==0?(
                      <div className="bookshelf" key={shelf_item}>
                      <h2 className="bookshelf-title">{shelf_item==='currentlyReading'?('Currently Reading'):shelf_item==='wantToRead'?'Want to Read':'Read'}</h2>
                  <Book bookUpdate={this.props.bookUpdate} book_list={booklist.filter((book)=>book.shelf===shelf_item)}/></div>
                    ):(<div className="bookshelf" key={shelf_item }></div>)
                    )}
              </div>
            </div>
            </div>
        );
    }
}

export default BookShelf