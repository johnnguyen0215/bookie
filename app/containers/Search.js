import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { fullTextSearch } from 'actions/search';
import Book from 'components/Book';

export default class Search extends React.Component {
  constructor(props){
    super();
    this.state = {
      maxPaginationIndices: 10,
      currentPaginationIndex: props.location.query.index
    }
  }

  componentDidMount(){
    const query = this.props.location.query.query;
    const index = this.props.location.query.index;
    const { dispatch } = this.props;
    dispatch(fullTextSearch(query, index));
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.location.query != this.props.location.query){
      const query = nextProps.location.query.query;
      const index = nextProps.location.query.index;
      const { dispatch } = this.props;
      dispatch(fullTextSearch(query, index));
    }
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        {results.message == "Search success" ?
          <div>
            <ul className="search-results">
              {results.data.items.map((item) => {
                return <li key={item.id}>
                  <Book data={item}></Book>
                </li>
              })}
            </ul>
            <div className="center-wrapper">
              <ul className="pagination">
                <li>
                  <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li>
                  <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          :
          <div className="loader"></div>
        }

      </div>
    );
  }
}

Search.propTypes = {
  results: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state){
  return {
    results: state.search
  };
}
export default connect(mapStateToProps)(Search);
