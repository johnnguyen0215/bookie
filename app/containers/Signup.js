import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { signUp, googleSignup } from 'actions/users'
import { searchCampuses } from 'actions/campuses'
import gButtonSignup from 'img/signup-google-button.png'
import fButtonSignup from 'img/signup-facebook-button.png'

class Signup extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			form: {
				email: '',
				password: '',
				profile: {
					name: '',
					campus: '',
					picture: ''
				}
			},
			formErrors: {
				name: false,
				password: false,
				campus: false,
				email: false
			}
		};

		this.form = {
			email: '',
			password: '',
			profile: {
				name: '',
				campus: '',
				picture: ''
			}
		};

		this.formErrors = {
			name: false,
			password: false,
			campus: false,
			email: false
		};


	}

	onNameChange(e) {
		this.form.profile.name = e.target.value;
		this.setState({form: this.form});
	}

	onPasswordChange(e){
		this.form.password = e.target.value;
		this.setState({form: this.form});
	}

	onCampusChange(e){
		const {dispatch} = this.props;
		dispatch(searchCampuses(e.target.value));
		this.form.profile.campus = e.target.value;
		this.setState({form: this.form});
	}

	onEmailChange(e){
		this.form.email = e.target.value;
		this.setState({form: this.form});
	}

	checkFields(){
		let error = false;
		if (!this.form.email){ 
			this.formErrors.email = true;
			error = true;
		}
		else{ 
			this.formErrors.email = false;
		}

		if (!this.form.password){ 
			this.formErrors.password = true;
			error = true;
		}
		else{
			this.formErrors.password = false;
		}

		if (!this.form.profile.name){ 
			this.formErrors.name = true;
			error = true;
		}
		else {
			this.formErrors.name = false;
		}
		
		if (!this.form.profile.campus) {
			this.formErrors.campus = true;
			error = true;
		}
		else {
			this.formErrors.campus = false;
		}

		return error;
	}

	onRegisterSubmit(){
		let errorExists = this.checkFields();
		this.setState({formErrors: this.formErrors});
		if (!errorExists){
			const { dispatch } = this.props;
			dispatch(signUp(this.state.form));
		}
	}

	validateEmail(){
	    const re = "/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;"
	    return re.test(this.form.email);
	}



	printProps(){
		console.log(this);
		console.log(this.props);
		console.log(this.state);
		console.log(this.profile);
	}

	campusRequest(){
		const { dispatch } = this.props;
		dispatch(getCampuses());
	}

	
	setCampus(campusName){
		this.form.profile.campus = campusName;
		this.setState({form: this.form});
		this.props.campuses.data = [];
	}



	render() {
		return (
		  <div>
		  	<div className="module form-module">
		      <div className="toggle"><i className="fa fa-times fa-pencil"></i>
		        <div className="tooltip">Click Me</div>
		      </div>
		      <div className="form">
		        <h2>Create an account</h2>
		        <form>
		          <input type="text" placeholder="Full Name" onChange={this.onNameChange.bind(this)}/>
		          {this.formErrors.name ?
		          	<p className="signup-form-error">* Enter your full name</p>
		          	: null
		          }
		          <input type="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)}/>
  		          {this.formErrors.password ?
		          	<p className="signup-form-error">* Enter a valid password (length >= 6, at least one special character)</p>
		          	: null
		          }
		          <input type="text" placeholder="Campus Name" value={this.state.form.profile.campus} onChange={this.onCampusChange.bind(this)}/>
		          {this.props.campuses.data.length > 0 ? 
			          <div className="dropdown">
			          	<ul className="dropdown-menu">
			          		{this.props.campuses.data.map((campus) => {
			          			return <li key={campus._id}><a onClick={this.setCampus.bind(this, campus.name)} href="#">{campus.name}</a></li>
			          		})}
				        </ul>
			          </div>
			          : null
			      }
   		          {this.formErrors.campus ?
		          	<p className="signup-form-error">* Enter a valid school name</p>
		          	: null
		          }
		          <input type="email" ref="email" placeholder="Email Address" onChange={this.onEmailChange.bind(this)}/>
 		          {this.formErrors.email ?
		          	<p className="signup-form-error">* Enter a valid email address.</p>
		          	: null
		          }
		        </form>
		        <button onClick={this.onRegisterSubmit.bind(this)}>Register</button>
		        <a href={"/auth/google?campus="+this.state.form.profile.campus}><img src={gButtonSignup} className="g-button"/></a>
		      	<input className="f-button" type="image" src={fButtonSignup}></input>
		      </div>
		    </div>
		  </div>
		);
	}
}

Signup.propTypes = {
  user: PropTypes.object,
  campuses: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(state){
	return {
		user: state.user,
		campuses: state.campus
	};
}

export default connect(mapStateToProps)(Signup);

/*
<input onClick={this.onGoogleSignup.bind(this)} className="g-button" type="image" src={gButtonSignup}></input>
*/