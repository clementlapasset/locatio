import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table, Card, CardBody, CardText, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Badge, Label } from 'reactstrap'
import NavBarMain from '../components/NavBarMain'
import BarChart from '../components/BarChart'
import { useParams } from 'react-router-dom';

import {connect} from 'react-redux'


function Charges(props) {

    // state variable to store list of all finance documents 
    const [financeList, setFinanceList] = useState([])

    // state variables to calculate global balance of charges
    const [totalProvisions, setTotalProvisions] = useState(0)
    const [totalCharges, setTotalCharges] = useState(0)

    //state variables used to send data from 'add expense' to backend 
    const [chargeDescription, setChargeDescription] = useState('')
    const [chargeCost, setChargeCost] = useState(null)
    const [chargeDate, setChargeDate] = useState(new Date(''))
    const [chargeFrequence, setChargeFrequence] = useState(null)

    // state variable to control modal popup
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
   
    // state variable to control useEffect with every additional charge added
    const [chargeAdded, setChargeAdded] = useState(false)
    const [resetChargesUseEffect, setResetChargesUseEffect] = useState([])

    const [disabled, setdisabled] = useState(false)

    
    var currentMonth = new Date().getMonth()

    useEffect(() => {
        async function loadData() {
            var rawResponse = await fetch(`/finance/${props.token}`);
            var response = await rawResponse.json();

            var filteredList = response.filter(item => item.type==='charge' || item.type==='provision' || item.type==='regularisation')

            console.log('filtered list is', filteredList)
            setFinanceList(filteredList)

            //*******************************global sum of charges to date(includes any reguliarisations)**********************/
            var sumCharges = 0;
            response.forEach((element) => {
                if (new Date(element.dateDebut).getMonth()<=currentMonth){
                    if (element.type === 'charge') {
                        sumCharges += element.montant
                    }
                }
            })
            var sumRegularistionDeCharges = 0
            response.forEach((element) => {
                if (element.regulariserCharge){
                    sumRegularistionDeCharges += element.regulariserCharge
                }
                if (element.paiement<0)  {
                    sumRegularistionDeCharges -= element.paiement
                }
                }
            )

            setTotalCharges((sumCharges - sumRegularistionDeCharges))

            //******************************global sum of provisions to date(includes any reguliarisations)*************************/
            var sumProvisions = 0;
            response.forEach((element) => {
                if (element.type === 'provision') {
                    sumProvisions += element.montant * (currentMonth+1)
                }
            })

            var sumRegularistionDeProvisions = 0
            response.forEach((element) => {
                if (element.regulariserProvision){
                    sumRegularistionDeProvisions += element.regulariserProvision
                }
                if (element.paiement>0)  {
                    sumRegularistionDeProvisions += element.paiement
                }
                }
            )
            setTotalProvisions((sumProvisions - sumRegularistionDeProvisions))
            
        } loadData()
         
        if (chargeAdded) {
            loadData()
            setChargeAdded(false)
        }
        console.log(disabled)
        if (totalProvisions===0&&totalCharges===0){
            setdisabled(true)
        }
    }, [chargeAdded, resetChargesUseEffect])

            //******************************Function to POST new charge to DB and relaunch useEffect********************/

    var handleAddCharge = async () => {

        var rawResponse = await fetch('/finance', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `typeFromFront=charge&descriptionFromFront=${chargeDescription}&amountFromFront=${chargeCost}&dateDebutFromFront=${chargeDate}&frequencyFromFront=${chargeFrequence}`
           });

        var response = await rawResponse.json();
       

        props.onAddChargeClick(response)

        toggle()
        setdisabled(false)
        setChargeAdded(true)
    }
            //***********************************Function to RESET all charges Locataire/proprietaire***********************/
    var resetCharges = async () => {
       console.log(totalCharges)
        var rawResponse = await fetch('/finance', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `typeFromFront=regularisation&totalChargesFromFront=${totalCharges}&totalProvisionsFromFront=${totalProvisions}&amountFromFront=${totalProvisions-totalCharges}&descriptionFromFront=regularisation de charges&dateDebutFromFront=${new Date()}`
           });

        var response = await rawResponse.json();

        props.handleResetCharges(response)

        setTotalProvisions(0)
        setTotalCharges(0)
        setdisabled(true)
        
        setResetChargesUseEffect(props.reset)

    }

    return (

        <div>
            <NavBarMain />
            <Container fluid>
                <Row style={{ marginTop: '20px'}}><Col lg={{ size: 6}}><Button style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}>Ce mois-ci</Button>{' '}<Button style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}>Cette année</Button></Col></Row>
                <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Col lg='5'>
                    <h5>Equilibre sur la période en cours</h5>
                        <Card>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', paddingLeft:'16px', paddingRight:'16px'}}>
                            <span style={{width:'125px', textAlign:'center'}}>Global Provisions</span>
                            <span style={{width:'125px', textAlign:'center'}}>Global Charges</span>
                            <span style={{width:'125px', textAlign:'center'}}>Global Balance</span>
                            </div>
                            <CardBody style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                                <div className='circleProvision'><CardText style={{ color: '#FFFFFF', margin: 'auto' }}>{totalProvisions}€</CardText></div> -
                                <div className='circleCharges'><CardText style={{ color: '#FFFFFF', margin: 'auto' }}>{totalCharges}€</CardText></div> =
                                <div className='circleTotal'><CardText style={{ color: '#FFFFFF', margin: 'auto' }}>{totalProvisions - totalCharges}€</CardText></div>
                            </CardBody>
                            <Button disabled={disabled} onClick={() => resetCharges()} style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}>Regulariser Charges</Button>
                        </Card>
                    </Col>
                    <Col lg='6'><BarChart /></Col>
                    </Row>
                <Row style={{ marginTop: '20px', paddingBottom: '10px'}}><Col style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>Charges et provisions</h3>
                    <Button 
                        style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}
                        onClick={() => toggle()}
                    >
                        Ajouter une charge
                    </Button>
                </Col></Row>
                <Row style={{height: '34vh', overflow: 'auto'}}>
                    <Table><thead style={{borderBottomColor:'#FFB039', position:'sticky', top: '0', backgroundColor:'#FFB039', color: '#FFFFFF'}}><tr><th style={{width:'25%'}}>Type</th><th style={{width:'25%'}}>Description</th><th style={{width:'25%'}}>Montant</th><th style={{width:'25%'}}>Date</th></tr></thead><tbody>

                        {financeList.map((finance) => (
                            <tr><th scope="row"><Badge pill color='charge' style={{ width:'100px'}}>{finance.type}</Badge></th><td>{finance.description}</td><td>{finance.montant}€</td><td>{new Date(finance.dateDebut).toLocaleDateString()}</td></tr>
                        ))}

                    </tbody>
                    </Table>
                </Row>
            </Container>
            <Modal      isOpen={modal}
                    >
                        <ModalHeader style={{justifyContent:'center'}} >
                            Ajouter une charge
                        </ModalHeader>
                        <ModalBody>
                        <Form>
                            <FormGroup> <Input onChange={(e) => setChargeDescription(e.target.value)} placeholder="Description" type="string"/></FormGroup>
                            <FormGroup> <Input onChange={(e) => setChargeCost(parseInt(e.target.value))} placeholder="Cost" type="number"/></FormGroup>
                            <FormGroup> <Input onChange={(e) => setChargeFrequence(parseInt(e.target.value))} placeholder="recourrance" type="select"><option>frequence de charge par an</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></Input></FormGroup>
                            <FormGroup> <Label>Date de début</Label><Input onChange={(date) => setChargeDate(new Date(date.target.value))} placeholder="Date" type="date"/></FormGroup>
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
   },
   handleResetCharges: function(resetResponse) {
    dispatch( {type: 'resetCharges', reset: resetResponse })
    console.log('this has passed to the reducer to reset charges',resetResponse)
    }
}
}

function mapStateToProps(state) {
    return { reset: state.resetCharges, token: state.token }
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(Charges);
