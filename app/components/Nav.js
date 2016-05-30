import React, {PropTypes} from 'react';
import { IndexLink, Link } from 'react-router'
import { connect } from 'react-redux'
import { logOut } from 'actions/users.js'
import { fullTextSearch } from 'actions/search.js'
import { push, replace } from 'react-router-redux'
import materialBookPng from 'img/material-book.png'

class Nav extends React.Component {
  constructor() {
    super()
      this.state = {
        collapsed: true,
        searchQuery: ''
      };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  onLogout(){
    const { dispatch } = this.props;
    dispatch(logOut());
    this.toggleCollapse();

  }

  onSearchChange(e){
    this.setState({searchQuery: e.target.value});
  }

  onSearchSubmit(e){
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(push('/search?q=' + this.state.searchQuery + '&i=0'));
    this.setState({searchQuery: ''});
  }

  printProps(){
    console.log(this.props);
    console.log(this.state);
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/" onClick={this.toggleCollapse.bind(this)}>
              <img className="pull-left" width="50px" height="50px" src={materialBookPng}></img>
              <span className="pull-left">Bookie</span>
            </Link>
          </div>
          <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <form onSubmit={this.onSearchSubmit.bind(this)} className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input type="text" className="form-control" value={this.state.searchQuery} onChange={this.onSearchChange.bind(this)} placeholder="Search"></input>
              </div>
            </form>
            {!this.props.user.authenticated ?
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="signup" onClick={this.toggleCollapse.bind(this)}>Sign Up</Link>
                </li>
                <li>
                  <Link to="login" onClick={this.toggleCollapse.bind(this)}>Login</Link>
                </li>
              </ul>
              :
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="cart" onClick={this.toggleCollapse.bind(this)}>Cart</Link>
                </li>
                <li>
                   <Link to="#" onClick={this.onLogout.bind(this)}>Logout</Link>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Nav);
