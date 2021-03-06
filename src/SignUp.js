import React, {Component} from 'react';
import axios from 'axios';
import {Badge, Button, Form, FormControl, FormGroup, HelpBlock, Well} from 'react-bootstrap';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: {value: '', isValid: true, message: ''},
            password: {value: '', isValid: true, message: ''},
            confirmPassword: {value: '', isValid: true, message: ''},
            errorMessage: '',
            /*keyin:{values:'',isValid: true, message:''}*/
        };
    }

    change = e => {
        e.persist();
        this.setState(() => {
            return {
                [e.target.name]: {
                    value: e.target.value,
                }
            };
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.resetValidationStates();
        if (this.formIsValid()) {
            const apiUrl = 'http://boiling-lowlands-48353.herokuapp.com/';
            const method = 'createUser';
            const payload = {
                username: this.state.username.value,
                password: this.state.password.value
            };
            axios.post(apiUrl + method, payload)
                .then((response) => {
                    console.log(response);
                    if (response.status) {
                        this.setState(() => {
                            return {
                                errorMessage: 'Please login to continue',
                            };
                        });
                        this.handleClearForm(e);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.status)
                        this.setState(() => {
                            return {
                                errorMessage: 'Please Signup again',
                            };
                        });
                });
        }
    };

    formIsValid = () => {
        let flag = 0;
        if (this.state.username.value.length <= 3) {
            this.setState(() => {
                return {
                    username: {
                        isValid: false,
                        message: 'Please enter name of length greater than 3',
                        value: ''
                    },
                };
            });
            flag = 1;
        }
        if (this.state.password.value === '') {
            this.setState(() => {
                return {
                    password: {
                        isValid: false,
                        message: 'Please enter password',
                    },
                };
            });
            flag = 1;
        }
        if ((this.state.password.value) !== (this.state.confirmPassword.value)) {
            if ((this.state.password.value) === '') {
                this.setState(() => {
                    return {
                        password: {
                            isValid: false,
                            value: '',
                            message: 'Please enter a password',
                        },
                        confirmPassword: {
                            isValid: false,
                            value: '',
                        }
                    };
                });
                flag = 1;
            }
            else {
                this.setState(() => {
                    return {
                        password: {
                            value: ''
                        },
                        confirmPassword: {
                            isValid: false,
                            value: '',
                            message: 'Password did not match',
                        }
                    };
                });
                flag = 1;
            }
        }
        //for Key checking
        //else if{}
        return flag !== 1;

    };

    resetValidationStates = () => {
        let state = this.state;
        // eslint-disable-next-line
        Object.keys(state).map(key => {
            if (state[key].hasOwnProperty('isValid')) {
                state[key].isValid = true;
                state[key].message = '';
            }
        });
        this.setState(state);
    };

    handleClearForm = (e) => {
        this.setState({
            username: {value: '', isValid: true, message: ''},
            password: {value: '', isValid: true, message: ''},
            confirmPassword: {value: '', isValid: true, message: ''},
        });
    };

    render() {
        return (
            <div>
                <h2>Sign Up</h2>
                <Well>
                    <Badge>{this.state.errorMessage}</Badge><br/><br/>
                    <Form>
                        <FormGroup className={"has-error" ? !this.state.username.isValid : false}>
                            <FormControl
                                name="username"
                                placeholder="Username"
                                type="text"
                                value={this.state.username.value}
                                onChange={e => this.change(e)}
                            />
                            <HelpBlock>{this.state.username.message}</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <FormControl
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={this.state.password.value}
                                onChange={e => this.change(e)}
                            />
                            <HelpBlock>{this.state.password.message}</HelpBlock>
                        </FormGroup>
                        <FormGroup className={"has-error" ? !this.state.confirmPassword.isValid : false}>
                            <FormControl
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                type="password"
                                value={this.state.confirmPassword.value}
                                onChange={e => this.change(e)}
                            />
                            <HelpBlock>{this.state.confirmPassword.message}</HelpBlock>
                        </FormGroup>
                        {/*Key verficiation section*/}
                        {/*<FormGroup>*/}
                        {/*<FormControl*/}
                        {/*name="keyin"*/}
                        {/*placeholder="Key"*/}
                        {/*type="password"*/}
                        {/*value={this.state.keyin.value}*/}
                        {/*onChange={e => this.change(e)}*/}
                        {/*/>*/}
                        {/*<HelpBlock>{this.state.keyin.message}</HelpBlock>*/}
                        {/*</FormGroup>*/}
                        <Button onClick={e => this.onSubmit(e)}>
                            Submit
                        </Button>
                    </Form>
                </Well>
            </div>
        );
    }
}

export default SignUp;