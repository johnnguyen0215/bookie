import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { fullTextSearch } from 'actions/search';
import Book from 'components/Book';
import * as GLOBAL from '../constants/Globals';

export default class Search extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentQuery: props.location.query.query,
      currentPaginationIndex: parseInt(props.location.query.index),
      currentMaxResults: parseInt(props.location.query.maxResults)
    }
  }

  /**
   * Get query and index then dispatch a full text search
   */
  componentDidMount() {
    const query = this.state.currentQuery = this.props.location.query.query;
    const index = (parseInt(this.props.location.query.index)-1) * GLOBAL.MAX_ITEMS_PER_PAGE;
    this.setState({currentQuery: query, currentPaginationIndex: parseInt(this.props.location.query.index)});
    const maxResults = this.props.location.query.maxResults;
    const { dispatch } = this.props;
    dispatch(fullTextSearch(query, index, maxResults));
  }

  /**
   * Search was executed on search page, make a search
   * @param nextProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.location.query.query != this.props.location.query.query ||
        prevProps.location.query.index != this.props.location.query.index) {
      const query = this.props.location.query.query;
      const index = (parseInt(this.props.location.query.index) - 1) * GLOBAL.MAX_ITEMS_PER_PAGE;
      const maxResults = parseInt(this.props.location.query.maxResults);
      const { dispatch } = this.props;
      dispatch(fullTextSearch(query, index, maxResults));
    }
  }


  computePaginationIndices(totalItems) {
    let paginationIndices = [];
    let startIndex = 1;
    let endIndex = GLOBAL.MAX_PAGINATION_INDICES;

    if (this.props.location.query.index >= GLOBAL.PAGINATION_CUTOFF) {
      startIndex = parseInt(this.props.location.query.index) - 5;
      endIndex = parseInt(this.props.location.query.index) + 5;
    }

    for (var i = startIndex; i < endIndex; i++) {
      paginationIndices.push(i);
    }

    return paginationIndices;
  }

  paginationNext() {
    this.paginationSearch(this.state.currentPaginationIndex+1);
  }

  paginationPrev() {
    this.paginationSearch(this.state.currentPaginationIndex-1);
  }

  paginationSearch(index){
    const { dispatch } = this.props;
    dispatch(push(
        '/search?query=' + this.state.currentQuery +
        '&index=' + index +
        '&maxResults=' + GLOBAL.MAX_ITEMS_PER_PAGE
    ));
  }

  render() {
    const { results } = this.props;
    const { totalItems } = results;
    const paginationLinks = this.computePaginationIndices(totalItems);
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
                <li onClick={this.paginationPrev.bind(this)}>
                  <a>
                    <span >&laquo;</span>
                  </a>
                </li>
                {
                  paginationLinks.map((num) => {
                    return <li onClick={this.paginationSearch.bind(this, num)} key={num}>
                              <a className={(num == this.props.location.query.index
                                      ? "focus"
                                      : "")}
                              >
                                {num}
                              </a>
                            </li>
                  })
                }
                <li onClick={this.paginationNext.bind(this)}>
                  <a>
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
