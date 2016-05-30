import React from 'react';
import defaultThumbnail from 'img/default-thumbnail.jpg'

class Book extends React.Component{
  render(){
    const {data} = this.props;
    return (
      <li className="book" key={data.id}>
        <div className="row bookContainer">
          <div className="col-md-4">
            {data.volumeInfo.imageLinks ?
              <img src={data.volumeInfo.imageLinks.thumbnail}/>
              :
              <img src={defaultThumbnail}></img>
            }
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <span><strong>{data.volumeInfo.title}</strong></span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
              </div>
              <div className="col-md-3">
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
