import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextField";
import PropTypes from "prop-types";
import { addDashboard } from "../../actions/companyActions";
import { getCompanies } from "../../actions/companyActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: [],
      companyId: "",
      name: "",
      handle: "",
      remember_me: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.setState({
      companyList: this.props.companyList
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company.company.companies) {
      this.setState({
        companyList: nextProps.company.company.companies,
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const dashboard = {
      id: this.state.companyId
    };
  };

  handleCloseClick = e => {
    this.props.closePopup();
  };

  handleSelectClick = e => {
    let selectedItemId;
    console.log(selectedItemId);
  };

  renderCompanyList = () => {
    return (
      <div className="companyList">
        <ul className="list">
          {this.state.companyList.map((company, i) => {
            return (
              <li key={i} onClick={this.handleSelectClick.bind(this)}>
                {company.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    const { errors } = this.state;
    console.log(this.state.companyList);
    return (
      <div>
        <div className="loginContainer">
          <form onSubmit={this.onSubmit}>
            <div className="middleForm">
              <div className="formField">
                <p>Select Company</p>
                {this.renderCompanyList()}
              </div>
              <div className="formField">
                <p>Dashboard</p>
                <TextFieldGroup
                  type="text"
                  name="name"
                  placeholder="Ex. Fontys"
                  onChange={this.onChange}
                  value={this.state.handle}
                  error={errors.name}
                />
              </div>
              <div className="formField">
                <p>Dashboard handle</p>
                <TextFieldGroup
                  type="text"
                  name="handle"
                  placeholder="Ex. Fontys"
                  onChange={this.onChange}
                  value={this.state.handle}
                  error={errors.name}
                />
              </div>
            </div>
            <button className="btn" type="submit">
              <span>Add</span>
            </button>
            <button
              className="btn"
              type="submit"
              onClick={this.handleCloseClick.bind(this)}
            >
              <span>Cancel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  addDashboard: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addDashboard, getCompanies }
)(Dashboard);
