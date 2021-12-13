import React, { useState } from 'react';
import '../App.css';
import { Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import Stepper from 'react-stepper-horizontal';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'

import NavBarMain from '../components/NavBarMain';

function InformationProprerty(props) {
    let navigate = useNavigate();
    const [propertyAddress, setPropertyAddress] = useState('');
    const [surface, setSurface] = useState('');
    const [numberRooms, setNumberRooms] = useState('');
    const [alert, setAlert] = useState(false);

    console.log(props.token)

    var handleSubmitPropertyInfo = async () => {
        console.log("Property token :",props.token)
        const data = await fetch('/property-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `propertyAddress=${propertyAddress}&surface=${surface}&numberRooms=${numberRooms}&token=${props.token}`
        })
        const body = await data.json()

        if (body.result === true) {
            navigate('/information-location');
        } else {
            setAlert(true)
        }
    }

    return (
        <>
            <NavBarMain />

            <div className="Signup-page" >
                <Alert color="primary">
                    Merci pour votre inscription. Nous vous invitons dorénavant à renseigner quelques informations de bases sur votre bien.
                </Alert>

                <div className="Signup-area">
                    <Stepper
                        steps={[{ title: 'Informations du bien' }, { title: 'Informations de la location' }, { title: 'Informations locataire(s)' }]}
                        activeStep={0}
                        activeColor={'#00C689'}
                        completeColor={'#00C689'}
                    />
                    <Form className="Signup-area">
                        <h2>Informations du bien</h2>
                        <FormGroup >
                            <Col >
                                <Input type="text" className="Login-input" onChange={(e) => { setPropertyAddress(e.target.value); setAlert(false) }} placeholder="Adresse" />
                                <Input type="number" className="Login-input" onChange={(e) => { setSurface(e.target.value); setAlert(false) }} placeholder="Superficie (m2)" />
                                <Input type="number" className="Login-input" onChange={(e) => { setNumberRooms(e.target.value); setAlert(false) }} placeholder="Nombre de pièces" />
                            </Col>
                        </FormGroup>
                        <Alert color="danger" isOpen={alert} >Merci de remplir tous les champs</Alert>
                        <Button onClick={() => handleSubmitPropertyInfo()} className="Button" style={{ backgroundColor: '#00C689' }} >Valider</Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(
    mapStateToProps,
    null
)(InformationProprerty);