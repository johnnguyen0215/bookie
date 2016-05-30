import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { fullTextSearch } from 'actions/search';
import Book from 'components/Book';
import LoadingBar from 'react-redux-loading-bar'

export default class Search extends React.Component {
	constructor(props){
		super();
		this.state = {
			fruits: [{id:1, 'bananas'}, {id:2, 'apples'}, {id:3, 'oranges'}]
		}
	}

	componentDidMount(){
		console.log("Component Did Mount");
		const query = this.props.location.query.q;
		const index = this.props.location.query.i;
		const { dispatch } = this.props;
		dispatch(fullTextSearch(query, index));
	}

	componentWillReceiveProps(nextProps){
		if (this.state.shouldUpdate){
			console.log("got here");
			const query = this.props.location.query.q;
			const index = this.props.location.query.i;
			const { dispatch } = this.props;
			console.log("query:", query);
			dispatch(fullTextSearch(query, index));
		}
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
		return (
			<div>
				{results.message == "Search success" ?
					<ul>
						{this.state.fruits.map((fruit) => {
							<li key={fruit.id}>{}</li>
						})}
						/*
						{results.data.items.map((item) => {
							return
							<li key={item.id}>
								<div className="row bookContainer">
									<div className="col-md-4">
										{ item.volumeInfo.imageLinks.length !== 0 ?
											<img src={item.volumeInfo.imageLinks.thumbnail}/>
											:
											<p>No Thumbnail</p>
										}
									</div>
									<div className="col-md-8">
										<div className="row">
											<div className="col-md-12">
												<span><strong>{item.volumeInfo.title}</strong></span>
											</div>
										</div>
										<div className="row">
											<div className="col-md-3">
											</div>
											<div className="col-md-3">
											</div>
										</div>
									</div>
								</div
							</li>
						})}
						*/
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
