import React, {useState} from 'react';
import '../App.css';
import { Col, Button, Form, FormGroup, Input } from 'reactstrap';
import NavBarHome from '../components/NavBarHome';

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
    <div>
        <NavBarHome/>
        
<<<<<<< HEAD
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

=======
        <div className="Signup-page" lg={10}>
            <div className="Signup-area">
                
                <Form className="Signup-area">
                    <h2>Inscrivez-vous !</h2>
                    <FormGroup row>
                        <Col lg={10} >
                            <Input className="Login-input"  onChange={(e) => setSignUpFirstname(e.target.value)} placeholder="Prénom"/>
                            <Input className="Login-input"  onChange={(e) => setSignUpLastname(e.target.value)} placeholder="Nom"/>
                            <Input className="Login-input"  type="email"  placeholder="Email" onChange={(e) => setSignUpEmail(e.target.value)}/>
                            <Input className="Login-input"  type="password" onChange={(e) => setSignUpPassword(e.target.value)} placeholder="Password"/>
                        </Col>
                    </FormGroup>
                    <Button onClick={() => handleSubmitSignup()}  style={{backgroundColor:'#00C689', borderColor:'#00C689'}} >Sign-up</Button>
                </Form>
    
            </div>
>>>>>>> 83a02a0d194ac3a025c0e2c74796ca06364af1ad
        </div>
      </div>
    </div>
        
    );
}

