import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postMessages } from '../../actions/groups';


class Messages extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit = {handleSubmit(this.props.postMessages)}>
          <h4>Post a Message</h4>
          <div>
            <Field name="message" component="input" type="text" required />
          </div>
          <button type="submit" disabled={submitting} onClick={() => window.location.reload()}>Submit</button>
      </form>
    );

  }

}

Messages = reduxForm({
  form: 'Messages'
})(Messages);

export default connect(null, { postMessages })(Messages);
