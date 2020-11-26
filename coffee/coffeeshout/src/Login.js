import React, { Component } from 'react';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            Username: '',
            Password: ''
        }

        this.Password = this.Password.bind(this);
        this.Username = this.Username.bind(this);
        this.login = this.login.bind(this);
    }

    Username(event) {
        this.setState({ Username: event.target.value })
    }

    Password(event) {
        this.setState({ Password: event.target.value })
    }

    login(event) {
        debugger;
        fetch('http://localhost:3000/Login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: this.state.Username,
                Password: this.state.Password
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result.Status == 'Invalid')
                alert('Invalid User');
            else
                this.props.history.push("/Dashboard");
            })
    }

    render() {
                return (
                    <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="9" lg="7" xl="6">
                                <CardGroup>
                                    <Card className="p-2">
                                        <CardBody>
                                            <Form>
                                                <div class="row" className="mb-2 pageheading">
                                                    <div class="col-sm-12 btn btn-primary">
                                                        Login
                                                </div>
                                                </div>
                                                <InputGroup className="mb-3">
                                                    <Input type="text" onChange={this.Username} placeholder="Username" />
                                                </InputGroup>
                                                <InputGroup className="mb-4">
                                                    <Input type="password" onChange={this.Password} placeholder="Password" />
                                                </InputGroup>
                                                <Button onClick={this.login} color="success" block>Login</Button>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </CardGroup>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }   
    export default Login;    