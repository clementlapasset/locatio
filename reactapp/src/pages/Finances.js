import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Badge, Label } from 'reactstrap'
import NavBarMain from '../components/NavBarMain'

import {connect} from 'react-redux'
import Doughnut from '../components/DoughnutChart'
import LineChart from '../components/LineChart'


function Finance(props) {

    console.log(props.token)

    // state variable to store list of all finance documents 
    const [financeList, setFinanceList] = useState([])

    //state variables used to send data from 'add depense' to backend 
    const [depenseDescription, setDepenseDescription] = useState('')
    const [depenseAmount, setDepenseAmount] = useState(null)
    const [depenseDate, setDepenseDate] = useState(new Date(''))

    // state variable to control modal popup
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
   
    // state variable to control useEffect with every additional charge added
    const [depenseAdded, setDepenseAdded] = useState(false)

    var currentMonth = new Date().getMonth()

    useEffect(() => {

        async function loadData() {
            console.log(props.token)
            var rawResponse = await fetch(`/finance/${props.token}`);
            var response = await rawResponse.json();

            var filteredList = response.filter(item => item.type==='cost' || item.type==='rent')

            console.log('filtered list is', filteredList)
            setFinanceList(filteredList)

        } loadData()
         
        if (depenseAdded) {
            loadData()
        }
    }, [depenseAdded])

            //******************************Function to POST new charge to DB and relaunch useEffect********************/

    var handleAddDepense = async () => {

        var rawResponse = await fetch('/finance', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `typeFromFront=cost&descriptionFromFront=${depenseDescription}&amountFromFront=${depenseAmount}&dateDebutFromFront=${depenseDate}&token=${props.token}`
           });

        var response = await rawResponse.json();

        props.onAddDepenseClick(response)

        toggle()

    }

    return (

        <div>
            <NavBarMain />
            <Container fluid>
                <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        {/******************************INSERT GRAPH*************************************** */}
                    <Col lg='6' style={{position: 'relative', height: '40vh'}}><Doughnut /></Col>
                    <Col lg='6'><LineChart /></Col>
                    </Row>
                <Row style={{ marginTop: '20px', paddingBottom: '10px'}}><Col style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>Dépenses</h3>
                    <Button 
                        style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}
                        onClick={() => toggle()}
                    >
                        Ajouter une depense
                    </Button>
                </Col></Row>
                <Row style={{height: '34vh', overflow: 'auto'}}>
                    <Table><thead style={{borderBottomColor:'#FFB039', position:'sticky', top: '0', backgroundColor:'#FFB039', color: '#FFFFFF'}}><tr><th style={{width:'25%'}}>Status</th><th style={{width:'25%'}}>Description</th><th style={{width:'25%'}}>Montant</th><th style={{width:'25%'}}>Date</th></tr></thead><tbody>

                        {financeList.map((finance) => (
                            <tr><Badge color="success" pill>{finance.type}</Badge><td>{finance.description}</td><td>{finance.montant}€</td><td>{new Date(finance.dateDebut).toLocaleDateString()}</td></tr>
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
                            <FormGroup> <Input onChange={(e) => setDepenseDescription(e.target.value)} placeholder="Description" type="string"/></FormGroup>
                            <FormGroup> <Input onChange={(e) => setDepenseAmount(parseInt(e.target.value))} placeholder="Cost" type="number"/></FormGroup>
                            <FormGroup> <Input onChange={(date) => setDepenseDate(new Date(date.target.value))} placeholder="Date" type="date"/></FormGroup>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}
                                onClick={() => handleAddDepense()}
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
   onAddDepenseClick: function(depenseResponse) {
       dispatch( {type: 'depense', depense: depenseResponse })
       console.log('this has passed to the reducer',depenseResponse)
   },
}
}

function mapStateToProps(state) {
    return { reset: state.resetCharges, token: state.token }
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(Finance);
