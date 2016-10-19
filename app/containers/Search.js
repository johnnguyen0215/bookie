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
      currentPaginationIndex: props.location.query.index,
      currentMaxResults: props.location.query.maxResults
    }
  }

  /**
   * Get query and index then dispatch a full text search
   */
  componentDidMount() {
    const query = this.state.currentQuery = this.props.location.query.query;
    const index =
        this.state.currentPaginationIndex =
            this.props.location.query.index > 1
                ? this.props.location.query.index * GLOBAL.MAX_ITEMS_PER_PAGE
                : this.props.location.query.index;
    const maxResults = this.props.location.query.maxResults;
    this.state['currentQuery'] = query;
    const { dispatch } = this.props;
    dispatch(fullTextSearch(query, index, maxResults));
  }

  /**
   * Search was executed on search page, make a search
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query != this.props.location.query) {
      const query = this.state.currentQuery = nextProps.location.query.query;
      const index =
          this.state.currentPaginationIndex =
              nextProps.location.query.index > 1
              ? nextProps.location.query.index * GLOBAL.MAX_ITEMS_PER_PAGE
              : nextProps.location.query.index;
      const maxResults = this.state.currentMaxResults = nextProps.location.query.maxResults;
      this.state['currentQuery'] = query;
      const { dispatch } = this.props;
      dispatch(fullTextSearch(query, index, maxResults));
    }
  }

  computePaginationIndices(totalItems) {
    let paginationIndices = [];
    let startIndex = 1;
    let endIndex = GLOBAL.MAX_PAGINATION_INDICES;

    if (this.state.currentPaginationIndex >= GLOBAL.PAGINATION_CUTOFF) {
      startIndex = this.state.currentPaginationIndex - 5;
      endIndex = this.state.currentPaginationIndex + 5;
      endIndex >= totalItems ? endIndex = totalItems+1 : endIndex;
    }
    window.console.log(startIndex + ' ' + endIndex);
    for (var i = startIndex; i < endIndex; i++) {
      paginationIndices.push(i);
    }

    return paginationIndices;
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
                <li>
                  <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {
                  paginationLinks.map((num) => {
                    let boundPaginationClick = this.paginationSearch.bind(this, num);
                    return <li key={num}><a href="#" onClick={boundPaginationClick}>{num}</a></li>
                  })
                }
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
