import React, {PropTypes} from 'react';
import { manualLogin } from 'actions/users.js'
import { connect } from 'react-redux'
import gButtonSignin from 'img/signin-google-button.png'

class Login extends React.Component {

  onEmailChange(e){
    this.setState({email : e.target.value});
  }

  onPasswordChange(e){
    this.setState({password : e.target.value});
  }

  onLoginSubmit(){
    const {dispatch} = this.props;
    dispatch(manualLogin(this.state));
  }

  onGoogleLogin(){

  }

  printProps(){
    console.log(this.props);
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="module form-module">
          <div className="toggle"><i className="fa fa-times fa-pencil"></i>
            <div className="tooltip">Click Me</div>
          </div>
          <div className="form">
            <h2>Login to your account</h2>
            <form>
              <input type="email" placeholder="Email" onChange={this.onEmailChange.bind(this)}/>
              <input type="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)}/>
            </form>
            <button onClick={this.onLoginSubmit.bind(this)}>Login</button>
            <a href="/auth/google"><img className="g-button" src={gButtonSignin}></img></a>
          </div>
          <div className="cta"><a href="#">Forgot your password?</a></div>
          {this.props.user.message ? 
            <div className="alert alert-danger">{this.props.user.message}</div>
            :
            null
          }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state){
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);