import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../actions';
import {connect} from 'react-redux';

class Signin extends Component {

  handleFormSubmit({email, password}) {
    //need to do someting to log user in
    this.props.signinUser({email, password});
    //console.log(email, password);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            className="form-control"
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <Field
            className="form-control"
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          />
        </fieldset>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'signin'
})(Signin);

 export default Signin = connect(mapStateToProps, {signinUser})(Signin);

//export default reduxForm({form: 'signin'},null,  actions)(Signin);
