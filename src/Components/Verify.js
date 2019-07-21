import React, { Component } from "react";
import {connect} from 'react-redux';
import {teacherAuthenticated} from '../Store/action'

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
  }
  onChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

    verifyUser = (e) =>{
      debugger
      e.preventDefault()
      const {password} = this.state;
      const {password:apiPassword} = this.props;
      if(password === apiPassword){
          this.props.teacherAuthenticated(true);
          this.props.history.push('/courses')
      }else{
        alert("Your enters passowrd is inValid! please try again")
        this.setState({password: ""})
      }

    }

  render() {
    const { code } = this.state;
    return (
      <section className="main-login">
        <div className="layer">
          <div className="content-w3ls login">
            <div className="text-center icon">
              <a href="index.html">
                <img src="/images/logo-w.png" />
              </a>
              <br />
              <span className="fa fa-user" />
              <h3>Verify User</h3>
            </div>

            <div className="content-bottom">
              <form  className="form-login">
                <div className="field-group">
                  <span className="fa fa-user" aria-hidden="true" />
                  <div className="wthree-field">
                    <input
                      value={code}
                      style={{ backgroundColor: "#E7EDFF", color: "black" }}
                      onChange={this.onChange}
                      name="text1"
                      id="password"
                      type="password"
                      placeholder="Code"
                      required=""
                    />
                  </div>
                </div>
                <div className="wthree-field">
                  <button type="submit" className="btn" onClick={this.verifyUser}>
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({teacher}) {
  return{
      password: teacher.password
  }
}

const mapDispatchToProps = {
    teacherAuthenticated
}
export default connect(mapStateToProps, mapDispatchToProps)(Verify);
