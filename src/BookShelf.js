import React, {Component} from 'react';
import Book from './Book';

class BookShelf extends Component {
    render(){
      const booklist=this.props.booklist;
      const shelf=['Currently Reading', 'Want to Read', 'Read'];
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  {shelf.map((shelf_item)=>
                    booklist.filter((book)=>book.status===shelf_item).length!==0?(
                      <div className="bookshelf">
                      <h2 className="bookshelf-title">{shelf_item}</h2>
                  <Book bookUpdate={this.props.bookUpdate} book_list={booklist.filter((book)=>book.status===shelf_item)}/></div>
                    ):(<div className="bookshelf"></div>)
                    )}
              </div>
            </div>
            </div>
        );
    }
}

export default BookShelf