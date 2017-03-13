import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {}
  if (!values.term) errors.term = 'Please enter a word';
  // if (/^$/.test(values.term)) errors.term = 'Search can\'t be empty';
  return errors
}

const warn = values => {
  const warnings = {}
  // add warning if needed.
  // if (values.age < 19)  warnings.age = 'Hmm, you seem a bit young...' ;
  return warnings
}
// this function can't be in the render function because when the component
// rerender, it loses focus.
const renderField = ({ input, label, type,
    meta: { touched, error, warning } }) => (
      <div>
        {touched && ((error && <p className="danger">{error}</p>) ||
        (warning && <p>{warning}</p>))}
        <input {...input} type={type} />
      </div>
  );

class SearchForm extends Component {

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="search">
        <form onSubmit={ handleSubmit } >
          <Field name="term" component={ renderField } type="text" label="Term"
            required/>
          <button type="submit" value="">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    )
  }
}

SearchForm = reduxForm({
  form: 'searchForm', // a unique name for this form
  validate,  // <--- validation function given to redux-form
  warn
})(SearchForm);

export default SearchForm;
