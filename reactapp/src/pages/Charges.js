import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table, Card, CardBody, CardText, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Badge } from 'reactstrap'
import NavBarMain from '../components/NavBarMain'
import { BarChart } from '../components/BarChart'
import {connect} from 'react-redux'


function Charges(props) {

    const [financeList, setFinanceList] = useState([])
    const [totalProvisions, setTotalProvisions] = useState(0)
    const [totalCharges, setTotalCharges] = useState(0)
    const [modal, setModal] = useState(false);
    const [chargeDescription, setChargeDescription] = useState('')
    const [chargeCost, setChargeCost] = useState(null)
    const [chargeDate, setChargeDate] = useState(new Date(''))
    const [chargeFrequence, setChargeFrequence] = useState(null)

    const [chargeAdded, setChargeAdded] = useState(false)

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
         
        if (chargeAdded) {
            loadData()
            setChargeAdded(false)
        }
    }, [chargeAdded])

    var handleAddCharge = async () => {

        var rawResponse = await fetch('finance', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `typeFromFront=charge&descriptionFromFront=${chargeDescription}&amountFromFront=${chargeCost}&dateDebutFromFront=${chargeDate}&frequencyFromFront=${chargeFrequence}`
           });

        var response = await rawResponse.json();

        props.onAddChargeClick(response)

        toggle()
        setChargeAdded(true)
    }


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
                    <Table><thead style={{backgroundColor:'#FFB039', color: '#FFFFFF'}}><tr><th style={{width:'25%'}}>Status</th><th style={{width:'25%'}}>Description</th><th style={{width:'25%'}}>Montant</th><th style={{width:'25%'}}>Date</th></tr></thead><tbody>
                        {/************************************** *************** add in map ********************************************************************/}
                        {financeList.map((finance) => (
                            <tr><th scope="row"><Badge pill style={{backgroundColor:'#00C689', width:'100px'}}>Provision</Badge></th><td>{finance.description}</td><td>{finance.montant}€</td><td>{finance.dateDebut}</td></tr>
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
                            <FormGroup> <Input onChange={(e) => setChargeDescription(e.target.value)} placeholder="Description" type="string"/></FormGroup>
                            <FormGroup> <Input onChange={(e) => setChargeCost(parseInt(e.target.value))} placeholder="Cost" type="number"/></FormGroup>
                            <FormGroup> <Input onChange={(e) => setChargeFrequence(parseInt(e.target.value))} placeholder="recourrance" type="select"><option>recourrance du charge</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>6</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></Input></FormGroup>
                            <FormGroup> <Input onChange={(date) => setChargeDate(new Date(date.target.value))} placeholder="Date" type="date"/></FormGroup>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}
                                onClick={() => handleAddCharge()}
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

function mapDispatchToProps(dispatch) {
 return {
   onAddChargeClick: function(chargeResponse) {
       dispatch( {type: 'charge', charge: chargeResponse })
       console.log('this has passed to the reducer',chargeResponse)
   }
 }
}
export default connect(
    null,
    mapDispatchToProps
 )(Charges);
