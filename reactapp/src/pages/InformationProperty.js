import React, { useState } from 'react';
import '../App.css';
import { Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import Stepper from 'react-stepper-horizontal';
import { useNavigate } from "react-router-dom";

import NavBarHome from '../components/NavBarHome';

export default function InformationProprerty() {
    let navigate = useNavigate();
    const [propertyAddress, setPropertyAddress] = useState('');
    const [surface, setSurface] = useState('');
    const [numberRooms, setNumberRooms] = useState('');
    const [alert, setAlert] = useState(false);

    var handleSubmitPropertyInfo = async () => {
        const data = await fetch('/property-info', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `propertyAddress=${propertyAddress}&surface=${surface}&numberRooms=${numberRooms}`
        })
        const body = await data.json()

        if(body.result === true){
            navigate('/information-location');
        } else {
            setAlert(true)
        }
    }

    return (
        <>
            <NavBarHome />

            <div className="Signup-page" >
                <Alert
                    color="primary"
                >
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

