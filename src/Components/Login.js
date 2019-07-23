import React, {PureComponent} from 'react';
import axios from 'axios';

import {onBoard} from '../Utils/utils';
import {teacherLogin} from '../Store/action';
import {connect} from 'react-redux';

class Login extends PureComponent{
    state ={
        name: "",
        email: ""
    }
    doLogin  =( event) =>{
        event.preventDefault();

        try{
            axios.post(onBoard, {...this.state}).then(response =>{
                alert(response.data.password);
                this.props.teacherLogin(response.data);
                this.props.history.push('/verify');
            });

        }catch (err) {
            console.log(err);
        }

    }

    onChange = (event) =>{
        const {id, value} = event.target;

        this.setState({[id]: value});
    }

    render() {
        const {email, name} = this.state;
        return(
            <section className="main-login">
                <div className="layer">

                    <div className="content-w3ls login">
                        <div className="text-center icon">
                            <a href="index.html"><img src="/images/logo-w.png" /></a><br/>
                            <span className="fa fa-user" />
                            <h3>Dashboard login</h3>
                        </div>

                        <div className="content-bottom">
                            <form action="#" method="post" className="form-login">
                                <div className="field-group">
                                    <span className="fa fa-user" aria-hidden="true" />
                                    <div className="wthree-field">
                                        <input  id="name" type="text" value={name} placeholder="Teacher Name"
                                               required="" onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="field-group">
                                    <span className="fa fa-lock" aria-hidden="true" />
                                    <div className="wthree-field">
                                        <input  id="email" type="email" placeholder="Teacher Email" onChange={this.onChange} value={email} />
                                    </div>
                                </div>
                                <div className="wthree-field">
                                    <button type="submit" className="btn" onClick={this.doLogin}>Login</button>
                                </div>


                            </form>
                        </div>
                    </div>

                </div>
            </section>


        );
    }

}


const mapDispatchToProps = {
        teacherLogin
};


export default connect(null, mapDispatchToProps)(Login);
