import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table, Card, CardBody, CardText, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, CardTitle } from 'reactstrap'
import NavBarMain from '../components/NavBarMain'
import { BarChart } from '../components/BarChart'


export default function Charges() {

    const [financeList, setFinanceList] = useState([])
    const [totalProvisions, setTotalProvisions] = useState(0)
    const [totalCharges, setTotalCharges] = useState(0)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    useEffect(() => {
        async function loadData() {
            var rawResponse = await fetch('/finance/charges');
            var response = await rawResponse.json();
            setFinanceList(response)

            var sumCharges = 0;
            var chargesOnInitialisation = response.forEach((element) => {
                if (element.type === 'charge') {
                    sumCharges += element.montant
                }
            })
            console.log(chargesOnInitialisation)
            setTotalCharges(sumCharges)

            var sumProvisions = 0;
            var provisionsOnInitialisation = response.forEach((element) => {
                if (element.type === 'provision') {
                    sumProvisions += element.montant
                }
            })
            console.log(provisionsOnInitialisation)
            setTotalProvisions(sumProvisions)


        } loadData()
    }, [])


    return (

        <div>
            <NavBarMain />
            <Container fluid>
                <Row style={{ marginTop: '20px'}}><Col lg={{ size: 6, offset: '8' }}><Button style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}>Ce mois-ci</Button>{' '}<Button style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}>Cette année</Button></Col></Row>
                <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Col lg='5'>
                    Equilibre sur la période en cours
                        <Card>
                            <CardBody style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                                <div className='circleProvision'><CardText style={{ color: '#FFFFFF', margin: 'auto' }}>{totalProvisions}€</CardText></div> -
                                <div className='circleCharges'><CardText style={{ color: '#FFFFFF', margin: 'auto' }}>{totalCharges}€</CardText></div> =
                                <div className='circleTotal'><CardText style={{ color: '#FFFFFF', margin: 'auto' }}>{totalProvisions - totalCharges}€</CardText></div>
                            </CardBody>
                            <Button style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}>Regulariser Charges</Button>
                        </Card>
                    </Col>
                    <Col lg='6'><BarChart /></Col></Row>
                <Row style={{ marginTop: '20px', paddingBottom: '10px'}}><Col style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>Charges et provisions</h3>
                    <Button
                        style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}
                        onClick={() => toggle()}
                    >
                        Ajouter une charge
                    </Button>
                </Col></Row>
                <Row>
                    <Table><thead style={{backgroundColor:'#FFB039', color: '#FFFFFF'}}><tr><th>Status</th><th>Description</th><th>Montant</th><th>Date</th></tr></thead><tbody>
                        {/************************************** *************** add in map ********************************************************************/}
                        {financeList.map((finance) => (
                            <tr><th scope="row">1</th><td>{finance.description}</td><td>{finance.montant}€</td><td>{finance.dateDebut}</td></tr>
                        ))}
                    </tbody>
                    </Table>
                </Row>
            </Container>
            <Modal      isOpen={modal}
                        fullscreen=""
                    >
                        <ModalHeader style={{justifyContent:'center'}} >
                            Ajouter une charge
                        </ModalHeader>
                        <ModalBody>
                        <Form>
                            <FormGroup> <Input id="descriptionCharge" name="descriptionCharge" placeholder="Description" type="string"/></FormGroup>
                            <FormGroup> <Input id="priceCharge" name="priceCharge" placeholder="Price" type="number"/></FormGroup>
                            <FormGroup> <Input id="exampledateChargeEmail" name="dateCharge" placeholder="Date" type="date"/></FormGroup>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}
                                onClick={() => toggle()}
                            >
                                Ajouter
                            </Button>
                            {' '}
                            <Button onClick={() => toggle()}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
        </div>
    )
}
