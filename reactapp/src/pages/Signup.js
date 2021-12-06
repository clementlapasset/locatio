import React, {useState} from 'react';
import '../App.css';
import { Col, Button, Form, FormGroup, Input } from 'reactstrap';

export default function Signup() {

    const [signUpFirstname, setSignUpFirstname] = useState('')
    const [signUpLastname, setSignUpLastname] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')

    var handleSubmitSignup = async () => {
        const data = await fetch('/sign-up', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `firstName=${signUpFirstname}&lastName=${signUpLastname}&email=${signUpEmail}&password=${signUpPassword}`
        })
        const body = await data.json()
        console.log(body)
    }

    return (
        
        <div className="Signup-page">
            <div className="Signup-area">
                
                <Form className="Signup-area">
                    <h2>Inscrivez-vous !</h2>
                    <FormGroup row>
                        <Col >
                            <Input className="Login-input"  onChange={(e) => setSignUpFirstname(e.target.value)} placeholder="Prénom"/>
                            <Input className="Login-input"  onChange={(e) => setSignUpLastname(e.target.value)} placeholder="Nom"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col >
                            <Input className="Login-input"  type="email"  placeholder="Email" onChange={(e) => setSignUpEmail(e.target.value)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col >
                            <Input className="Login-input"  type="password" onChange={(e) => setSignUpPassword(e.target.value)} placeholder="Password"/>
                        </Col>
                    </FormGroup>
                    <Button onClick={() => handleSubmitSignup()} className="Login-input" >Sign-up</Button>
                </Form>
    
            </div>
        </div>
    );
}

