import React from 'react';
import defaultThumbnail from 'img/default-thumbnail.jpg'

class Book extends React.Component{
  render(){
    const {data} = this.props;
    return (
        <div className="row bookContainer">
          <div className="col-md-3">
            {data.volumeInfo.imageLinks ?
              <img src={data.volumeInfo.imageLinks.thumbnail}/>
              :
              <img src={defaultThumbnail}></img>
            }
          </div>
          <div className="col-md-6">
            <div><strong>{data.volumeInfo.title}</strong></div>
            <div><strong>{data.volumeInfo.authors[0]}</strong></div>
          </div>
          <div className="col-md-3">
              <a href="#" className="btn btn-primary">BUY</a>
              <a href="#" className="btn btn-success">SELL</a>
          </div>
        </div>
    );
  }
}

export default Book;
