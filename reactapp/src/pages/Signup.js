import React, { useState } from 'react';
import '../App.css';
import { Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import NavBarMain from '../components/NavBarMain';
import { connect } from 'react-redux'

function Signup(props) {

    const [signUpFirstname, setSignUpFirstname] = useState('')
    const [signUpLastname, setSignUpLastname] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [listErrorsSignup, setErrorsSignup] = useState([])

    let navigate = useNavigate();

    var handleSubmitSignup = async () => {
        const data = await fetch('/sign-up-landlord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `firstName=${signUpFirstname}&lastName=${signUpLastname}&email=${signUpEmail}&password=${signUpPassword}&landlord=${true}`
        })
        const body = await data.json()

        if (body.result === true) {
            console.log("Signup token :",body.token)
            props.addToken(body.token)
            navigate('/information-property');
        } else {
            setErrorsSignup(body.error)
        }
    }

    var tabErrorsSignup = listErrorsSignup.map((error, i) => {
        return (<p>{error}</p>)
    })

    return (
        <div>
            <NavBarMain />

            <div className="Signup-page" lg={10}>
                <div className="Signup-area">

                    <Form className="Signup-area">
                        <h2>Inscrivez-vous !</h2>
                        <FormGroup row>
                            <Col lg={10} >
                                <Input className="Login-input" onChange={(e) => setSignUpFirstname(e.target.value)} placeholder="Prénom" />
                                <Input className="Login-input" onChange={(e) => setSignUpLastname(e.target.value)} placeholder="Nom" />
                                <Input className="Login-input" type="email" placeholder="Email" onChange={(e) => setSignUpEmail(e.target.value)} />
                                <Input className="Login-input" type="password" onChange={(e) => setSignUpPassword(e.target.value)} placeholder="Password" />
                            </Col>
                        </FormGroup>
                        {tabErrorsSignup}
                        <Button onClick={() => handleSubmitSignup()} style={{ backgroundColor: '#00C689', borderColor: '#00C689' }} >Sign-up</Button>
                    </Form>

                </div>
            </div>
        </div>

    );
}

function mapDispatchToProps(dispatch) {
    
    return {
        addToken: function (token) {
            console.log("token sent to reducer")
            dispatch({ type: 'addToken', token: token })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Signup)