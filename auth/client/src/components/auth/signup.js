import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { signupUser } from '../../actions';
import {connect} from 'react-redux';

class Signup extends Component {

  handleFormSubmit(values) {
    this.props.signupUser(values);
    //console.log(values);
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
          <Field name="email" type="email" component={renderField} label="Email:"/>
        </fieldset>
        <fieldset className="form-group">
          <Field name="password" type="password" component={renderField} label="Password:"/>

        </fieldset>
        <fieldset className="form-group">
          <Field name="passwordConfirm" type="password" component={renderField} label="Confirm Password:"/>
        </fieldset>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} className="form-control" />
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

function validate(values) {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if( values.password !== values.passwordConfirm) {
    errors.password = "Password must match";
  }

  //console.log(values);

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);

 export default Signup = connect(mapStateToProps, {signupUser})(Signup);
