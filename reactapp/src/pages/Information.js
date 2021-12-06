import React from 'react';
import '../App.css';
import { Col, Button, Form, FormGroup, Input } from 'reactstrap';

export default function Signup() {

    var handleSubmitSignup = async () => {
        console.log("submit clicked")
    }

    return (
        
        <div className="Signup-page" lg={10}>
            <div className="Signup-area">
                
                <Form className="Signup-area">
                    <h2>Inscrivez-vous !</h2>
                    <FormGroup row>
                        <Col lg={10} >
                            <Input className="Login-input"  />
                            <Input className="Login-input"  />
                            <Input className="Login-input"  />
                            <Input className="Login-input"  />
                        </Col>
                    </FormGroup>
                    <Button onClick={() => handleSubmitSignup()} className="Login-input" >Valider</Button>
                </Form>
    
            </div>
        </div>
    );
}

