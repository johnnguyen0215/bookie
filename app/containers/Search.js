import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { fullTextSearch } from 'actions/search';
import Book from 'components/Book';
import LoadingBar from 'react-redux-loading-bar'

export default class Search extends React.Component {
	constructor(props){
		super();
	}

	componentDidMount(){
		const query = this.props.location.query.q;
		const index = this.props.location.query.i;
		const { dispatch } = this.props;
		dispatch(fullTextSearch(query, index));
	}

	componentWillReceiveProps(nextProps){
        /*
		if (this.state.shouldUpdate){
			const query = this.props.location.query.q;
			const index = this.props.location.query.i;
			const { dispatch } = this.props;
			dispatch(fullTextSearch(query, index));
		}*/
	}

	/*
	componentWillReceiveProps(nextProps){
		if (nextProps.location.query != this.props.location.query){
			console.log("got here");
			const query = this.props.location.query.q;
			const index = this.props.location.query.i;
			const { dispatch } = this.props;
			console.log("query:", query);
			dispatch(fullTextSearch(query, index));
		}
	}*/

	render() {
		const { results } = this.props;
		console.log(results);
		return (
			<div>
				{results.message == "Search success" ?
					<ul>
						{results.data.items.map((item) => {
							return <li key={item.id}>
                                        <Book data={item}></Book>
							        </li>
						})}
					</ul>
					:
					<p>Nothing to see here</p>
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
