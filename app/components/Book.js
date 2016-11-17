import React from 'react';
import defaultThumbnail from 'img/default-thumbnail.jpg'

export default class Book extends React.Component{

  findISBNThirteen(ISBN) {
    return ISBN.type === 'ISBN_13';
  }

  onThumbnailHover() {

  }

  render(){
    const { data } = this.props;
    const title = data.volumeInfo.title;
    const author = data.volumeInfo.authors
        ? data.volumeInfo.authors[0]
        : "Unknown";

    const isbnID = data.volumeInfo.industryIdentifiers
        ? data.volumeInfo.industryIdentifiers.find(this.findISBNThirteen).identifier
        : "Unknown";
    window.console.log(isbnID);
    return (
        <div className="row bookContainer">
          <div className="col-md-2">
            {data.volumeInfo.imageLinks ?
              <img src={data.volumeInfo.imageLinks.thumbnail}/>
              :
              <img onMouseOver={this.onThumbnailHover.bind(this)} src={defaultThumbnail}/>
            }
          </div>
          <div className="col-md-5">
            <ul>
              <li>
                <label>Title: </label><strong>{title}</strong>
              </li>
              <li>
                <label>Author: </label><strong>{author}</strong>
              </li>
              <li>
                <label>ISBN: </label>{isbnID}
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <label>Buyers:</label><div></div>
            <label>Sellers:</label><div></div>
            <button className="bookDescriptionButton btn btn-primary">Description</button>
          </div>
          <div className="col-md-2">
              <ul>
                <li>
                  <a href="#" className="barterButton btn btn-primary">BUY</a>
                </li>
                <li>
                  <a href="#" className="barterButton btn btn-success">SELL</a>
                </li>
              </ul>
          </div>
        </div>
    );
  }
}

