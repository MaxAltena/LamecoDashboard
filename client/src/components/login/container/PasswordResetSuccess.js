import React from "react";
import PropTypes from "prop-types";

const PasswordResetSuccess = ({ email, onForgot }) => {
  return (
    <div className="passwordResetSuccess">
      <h3>Password updated</h3>
      <p>
        The password for <strong>{email}</strong> has been reset. You can now
        log in with the new password which you have just created. Go to the{" "}
        <a href="/login" onClick={onForgot} className="inForm">
          login here
        </a>
        .
      </p>
      <a href="/login" onClick={onForgot} className="bottomForm">
        <i className="material-icons">arrow_back_ios</i>
        <span>Back to login</span>
      </a>
    </div>
  );
};

PasswordResetSuccess.propTypes = {
  email: PropTypes.string.isRequired,
  onForgot: PropTypes.func.isRequired
};

export default PasswordResetSuccess;
