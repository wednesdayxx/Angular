
import React, { Component } from 'react';
import { Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Reg extends Component {
    constructor() {
        super();

        this.state = {
            Username: '',
            Password: '',
        }

        this.Username = this.Username.bind(this);
        this.Password = this.Password.bind(this);
        this.register = this.register.bind(this);
    }

    Username(event) {
        this.setState({ Username: event.target.value })
    }

    Password(event) {
        this.setState({ Password: event.target.value })
    }

    register(event) {
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
        .then((Result) => {
            if (Result.Status == 'Success')
                this.props.history.push("/Dashboard");
            else
                alert('Sorry, Un-Authorized User!!')
        })
    }

    render() {
            return (
                <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                    <Col md="9" lg="7" xl="6">
                        <Card className="mx-4">
                        <CardBody className="p-4">
                            <Form>
                            <div class="row" className="mb-2 pageheading">
                                <div class="col-sm-12 btn btn-primary">
                                Sign Up
                                </div>
                            </div>
                            <InputGroup className="mb-3">
                                <Input type="text"  onChange={this.Username} placeholder="Username" />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Input type="password"  onChange={this.Password} placeholder="Password" />
                            </InputGroup>
                            <Button  onClick={this.register}  color="success" block>Create Account</Button>
                            </Form>
                        </CardBody>
                        </Card>
                    </Col>
                    </Row>
                </Container>
                </div>
                );
            } 
}
export default Reg;
