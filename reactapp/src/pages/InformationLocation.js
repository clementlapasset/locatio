import React, { useState } from 'react';
import '../App.css';
import { Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import Stepper from 'react-stepper-horizontal';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'

import NavBarMain from '../components/NavBarMain';

function InformationLocation(props) {
    let navigate = useNavigate();
    const [monthlyRent, setMonthlyRent] = useState(0);
    const [monthlyProvision, setMonthlyProvision] = useState(0);
    const [monthlyCreditCost, setMonthlyCreditCost] = useState(0);
    const [monthlyAnnexCost, setMonthlyAnnexCost] = useState(0);
    const [alert, setAlert] = useState(false);

    var currentDate = new Date()

    var handleSubmitLocationInfo = async () => {
        if (monthlyRent) {
            await fetch('/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `amountFromFront=${monthlyRent}&typeFromFront=rent&frequencyFromFront=12&descriptionFromFront=Loyer&dateDebutFromFront=${currentDate}&token=${props.token}`
            })
            await fetch('/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `amountFromFront=${monthlyProvision}&typeFromFront=provision&frequencyFromFront=12&descriptionFromFront=Provision&dateDebutFromFront=${currentDate}&token=${props.token}`
            })
            await fetch('/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `amountFromFront=${monthlyCreditCost}&typeFromFront=fixedCost&frequencyFromFront=12&descriptionFromFront=Mensualité Crédit&dateDebutFromFront=${currentDate}&token=${props.token}`
            })
            await fetch('/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `amountFromFront=${monthlyAnnexCost}&typeFromFront=fixedCost&frequencyFromFront=12&descriptionFromFront=Assurance Habitation&dateDebutFromFront=${currentDate}&token=${props.token}`
            })
            console.log("Finances submitted with user's token :", props.token)
            navigate('/information-tenant');
        } else {
            setAlert(true)
        }
    }

    return (
        <>
            <NavBarMain />

            <div className="Signup-page" >
                <Alert color="primary">
                    Veuillez renseigner quelques informations de bases sur vos revenus et coûts mensuels.
                </Alert>

                <div className="Signup-area">
                    <Stepper
                        steps={[{ title: 'Informations du bien' }, { title: 'Informations de la location' }, { title: 'Informations locataire(s)' }]}
                        activeStep={1}
                        activeColor={'#00C689'}
                        completeColor={'#00C689'}
                    />
                    <Form className="Signup-area">
                        <h2>Revenus et coûts mensuels</h2>
                        <FormGroup >
                            <Col >
                                <Input type="number" className="Login-input" onChange={(e) => { setMonthlyRent(e.target.value); setAlert(false) }} placeholder="Loyer mensuel (hors charges)*" />
                                <Alert color="danger" isOpen={alert} >Merci de remplir un loyer</Alert>
                                <Input type="number" className="Login-input" onChange={(e) => { setMonthlyProvision(e.target.value); }} placeholder="Charges provisionnelles mensuelles" />
                                <Input type="number" className="Login-input" onChange={(e) => { setMonthlyCreditCost(e.target.value); }} placeholder="Mensualité de votre crédit" />
                                <Input type="number" className="Login-input" onChange={(e) => { setMonthlyAnnexCost(e.target.value); }} placeholder="Coût mensuel annexe (ex : assurance, taxes, etc.)" />
                            </Col>
                        </FormGroup>
                        <Button onClick={() => handleSubmitLocationInfo()} className="Button" style={{ backgroundColor: '#00C689' }} >Valider</Button>
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
)(InformationLocation);