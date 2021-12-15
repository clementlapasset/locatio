import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Badge, Label } from 'reactstrap'
import NavBarMain from '../components/NavBarMain'
import { FaTrashAlt } from 'react-icons/fa';

import { connect } from 'react-redux'
import Doughnut from '../components/DoughnutChart'
import LineChart from '../components/LineChart'


function Finance(props) {


    // state variable to store list of all finance documents 
    const [financeList, setFinanceList] = useState([])

    //state variables used to send data from 'add depense' to backend 
    const [costDescription, setCostDescription] = useState('')
    const [costAmount, setCostAmount] = useState(null)
    const [costDate, setCostDate] = useState(new Date(''))

    // state variable to control modal popup
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // state variable to control useEffect with every additional charge added
    const [pageUpdate, setPageUpdate] = useState(false)

    var currentMonth = new Date().getMonth()

    useEffect(() => {

        async function loadData() {
            console.log(props.token)
            var rawResponse = await fetch(`/finance/${props.token}`);
            var response = await rawResponse.json();

            var filteredList = response.filter(item => item.type === 'cost' || item.type === 'rent')

            setFinanceList(filteredList)

        } loadData()

        setPageUpdate(false)

    }, [pageUpdate])

    //******************************Function to POST new charge to DB and relaunch useEffect********************/

    var handleAddCost = async () => {

        var rawResponse = await fetch('/finance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `typeFromFront=cost&descriptionFromFront=${costDescription}&amountFromFront=${costAmount}&dateDebutFromFront=${costDate}&token=${props.token}`
        });

        var response = await rawResponse.json();

        props.onAddCostClick(response)

        toggle()
        setPageUpdate(true)

    }


    var clickToDeleteCost = async (costId) => {

        console.log('costId is', costId)

        var deleteCost = await fetch('/delete-cost', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `costId=${costId}`
        });

        var response = await deleteCost.json()
        console.log('has document been deleted', response)

        setPageUpdate(true)
    }

    return (

        <div>
            <NavBarMain />
            <h1 style={{ marginTop: "50px", marginBottom: "20px", textAlign:'center' }}>Visualisez les revenus et coûts de votre investissement</h1>
            <Container fluid>
                <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {/******************************INSERT GRAPH*************************************** */}
                    <Col lg='6' style={{ position: 'relative', height: '40vh' }}><Doughnut /></Col>
                    <Col lg='6'><LineChart /></Col>
                </Row>
                <Row style={{ marginTop: '20px', paddingBottom: '10px' }}><Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Dépenses</h3>
                    <Button
                        style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}
                        onClick={() => toggle()}
                    >
                        Ajouter une depense
                    </Button>
                </Col></Row>
                <Row style={{ height: '34vh', overflow: 'auto' }}>
                    <Table><thead style={{ borderBottomColor: '#FFB039', position: 'sticky', top: '0', backgroundColor: '#FFB039', color: '#FFFFFF' }}><tr><th style={{ width: '25%' }}>Status</th><th style={{ width: '25%' }}>Description</th><th style={{ width: '25%' }}>Montant</th><th style={{ width: '25%' }}>Date</th><th>Supprimer</th></tr></thead><tbody>

                        {financeList.map((finance) => (
                            <tr><th scope="row"><Badge pill style={{ backgroundColor: '#f1f1f1' }} >{finance.type}</Badge></th><td>{finance.description}</td><td>{finance.montant}€</td><td>{new Date(finance.dateDebut).toLocaleDateString()}</td><td><FaTrashAlt className="trash" onClick={() => clickToDeleteCost(finance._id)} style={{ marginRight: "5px", cursor: "pointer" }}></FaTrashAlt></td></tr>
                        ))}

                    </tbody>
                    </Table>
                </Row>
            </Container>
            <Modal isOpen={modal}
            >
                <ModalHeader style={{ justifyContent: 'center' }} >
                    Ajouter une charge
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup> <Input onChange={(e) => setCostDescription(e.target.value)} placeholder="Description" type="string" /></FormGroup>
                        <FormGroup> <Input onChange={(e) => setCostAmount(parseInt(e.target.value))} placeholder="Cost" type="number" /></FormGroup>
                        <FormGroup> <Input onChange={(date) => setCostDate(new Date(date.target.value))} placeholder="Date" type="date" /></FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}
                        onClick={() => handleAddCost()}
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
        onAddCostClick: function (costResponse) {
            dispatch({ type: 'cost', cost: costResponse })
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
