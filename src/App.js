import React from 'react'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books:[
      {
        name:'Best Android Apps',
        author: ["Mike Hendrickson", "Brian Sawyer"],
        img_url:'url("http://books.google.com/books/content?id=bUybAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api")',
        status:'Currently Reading',
        id:'bUybAgAAQBAJ'
      },
      {
        name:'Ender\'s Game',
        author:'Orson Scott Card',
        img_url:'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")',
        status:'Want to Read',
        id:'2'
      },
      {
        name:'Harry Potter & the Sorcerer\'s Stone',
        author:'J.K. Rowling',
        img_url:'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")',
        status:'Read',
        id:'3'
      }
    ],
    showSearchPage: false
  }

  searchHandling=()=>{
    this.setState({ showSearchPage: false });
  }

  updateBook=(targetBook, newStatus)=>{
    const elementsIndex = this.state.books.findIndex(book => book.id === targetBook.id ) 
    let elemIndex;
    if(elementsIndex===-1){
      this.addBook(targetBook);
      elemIndex=this.state.books.length-1;
    }
    else{
      elemIndex=elementsIndex;
    }
    let newArray = [...this.state.books]
    newArray[elemIndex] = {...newArray[elemIndex], status: newStatus}
    this.setState({
      books: newArray,
      });
  }

  addBook=(targetBook)=>{
    console.log("Control in addBook")
    const myvar=this.state.books;
    const myvar1=myvar.concat([targetBook]);
    this.setState({
      books:myvar1
    })
    console.log(this.state)
  }

  render(){
    return(
      <div className="app">
      {this.state.showSearchPage ? (
        <Search handleSearch={this.searchHandling} bookUpdate={this.updateBook} booklist={this.state.books}/>
      ) : (
        <BookShelf bookUpdate={this.updateBook} booklist={this.state.books}/>)}
         <div className="open-search">
            <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
          </div>
      </div>
    );
  }
}

export default BooksApp