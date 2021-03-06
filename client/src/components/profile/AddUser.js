import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile, addUser } from "../../actions/authActions";
import TitleBar from "../bars/TitleBar";
import TextFieldGroup from "../common/TextField";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2, username } = this.state;
    const { user, history, addUser } = this.props;

    const profileData = {
      id: user._id,
      name,
      email,
      password,
      password2,
      username
    };

    addUser(profileData, history);
  };

  render() {
    const { errors, name, email, password, password2, username } = this.state;
    const { history } = this.props;

    return (
      <div className="updateProfile">
        <TitleBar />
        <div className="profileContainer">
          <div className="backButton" onClick={() => history.push("/")}>
            <button className="btn icon red">
              <i className="material-icons">arrow_back</i>
              <span>Back</span>
            </button>
          </div>
          <div className="profileForm">
            <form onSubmit={this.onSubmit} className="adminForm">
              <div className="inputFields">
                <div className="adminFormInfo">
                  <h6>Register</h6>
                  <TextFieldGroup
                    placeholder="* Name"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextFieldGroup
                    placeholder="* Email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    placeholder="* Username"
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    error={errors.username}
                  />
                </div>
                <div className="adminFormPassword">
                  <h6>Password</h6>
                  <TextFieldGroup
                    placeholder="* Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
                    placeholder="* Password repeat"
                    name="password2"
                    type="password"
                    value={password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                </div>
              </div>
              <button type="submit" className="btn">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProfile.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, addUser }
)(UpdateProfile);
