import React, { useState } from 'react';
import '../App.css';
import { Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import Stepper from 'react-stepper-horizontal';
import { useNavigate } from "react-router-dom";

import NavBarHome from '../components/NavBarHome';

export default function InformationLocation() {
    let navigate = useNavigate();
    const [monthlyRent, setMonthlyRent] = useState('');
    const [monthlyProvision, setMonthlyProvision] = useState('');
    const [monthlyCreditCost, setMonthlyCreditCost] = useState('');
    const [alert, setAlert] = useState(false);

    var handleSubmitLocationInfo = async () => {
        if (monthlyRent && monthlyProvision) {
            await fetch('/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `
                    montant=${monthlyRent}&
                    type="rent"&
                    frequence="monthly"
                `
            })
            await fetch('/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `
                    montant=${monthlyProvision}&
                    type="provision"&
                    frequence="monthly"
                `
            })
            await fetch('/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `
                    montant=${monthlyCreditCost}&
                    type="cost"&
                    frequence="monthly"
                `
            })
            navigate('/information-tenant');
        } else {
            setAlert(true)
        }
    }

    return (
        <>
            <NavBarHome />

            <div className="Signup-page" >
                <Alert color="primary">
                    Veuillez renseigner quelques informations de bases sur votre location.
                </Alert>

                <div className="Signup-area">
                    <Stepper
                        steps={[{ title: 'Informations du bien' }, { title: 'Informations de la location' }, { title: 'Informations locataire(s)' }]}
                        activeStep={1}
                        activeColor={'#00C689'}
                        completeColor={'#00C689'}
                    />
                    <Form className="Signup-area">
                        <h2>Informations du bien</h2>
                        <FormGroup >
                            <Col >
                                <Input type="number" className="Login-input" onChange={(e) => { setMonthlyRent(e.target.value); setAlert(false) }} placeholder="Loyer mensuel (hors charges)" />
                                <Input type="number" className="Login-input" onChange={(e) => { setMonthlyProvision(e.target.value); setAlert(false) }} placeholder="Charges provisionnelles mensuelles" />
                                <Input type="number" className="Login-input" onChange={(e) => { setMonthlyCreditCost(e.target.value) }} placeholder="Coût mensuel du crédit" />
                            </Col>
                        </FormGroup>
                        <Alert color="danger" isOpen={alert} >Merci de remplir tous les champs</Alert>
                        <Button onClick={() => handleSubmitLocationInfo()} className="Button" style={{ backgroundColor: '#00C689' }} >Valider</Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

