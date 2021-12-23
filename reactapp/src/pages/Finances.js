import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Badge, Label } from 'reactstrap'
import NavBarMain from '../components/NavBarMain'
import { FaTrashAlt } from 'react-icons/fa';

import { connect } from 'react-redux'
import Doughnut from '../components/DoughnutChart'
import LineChart from '../components/LineChart'
import { finance } from 'faker';


function Finance(props) {

    console.log(props.token)

    // state variable to store list of all finance documents 
    const [financeList, setFinanceList] = useState([])

    //state variables used to send data from 'add depense' to backend 
    const [costDescription, setCostDescription] = useState('')
    const [costAmount, setCostAmount] = useState(null)
    const [costDate, setCostDate] = useState(new Date(''))
    const [costFrequence, setCostFrequence] = useState(null)

    // state variable to control modal popup
    const [modal, setModal] = useState(false);
    const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
    const [costToDelete, setCostToDelete] = useState({})

    const toggle = () => setModal(!modal);

    const toggleModalConfirmDelete = (finance) => {
        setModalConfirmDelete(!modalConfirmDelete)
        setCostToDelete(finance)
    }


    // state variable to control useEffect with every additional charge added
    const [pageUpdate, setPageUpdate] = useState(false)

    var currentMonth = new Date().getMonth()

    useEffect(() => {
        async function loadData() {
            console.log(props.token)
            var rawResponse = await fetch(`/finance/${props.token}`);
            var response = await rawResponse.json();

            var filteredList = response.filter(item => item.type === 'fixedCost' || item.type === 'variableCost' || item.type === 'rent')
            console.log(filteredList)
            setFinanceList(filteredList)
            console.log('finance list is', financeList)

        } loadData()

        setPageUpdate(false)

    }, [pageUpdate])

    //******************************Function to POST new charge to DB and relaunch useEffect********************/

    var handleAddCost = async () => {

        var rawResponse = await fetch('/finance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `typeFromFront=variableCost&descriptionFromFront=${costDescription}&amountFromFront=${costAmount}&dateDebutFromFront=${costDate}&token=${props.token}`
        });

        var response = await rawResponse.json();

        toggle()
        props.onClickButton(response)
        setPageUpdate(!pageUpdate)
    }

    //******************************Function to DELETE charge in DB and relaunch useEffect********************/

    var clickToDeleteCost = async (costToDelete) => {

        var deleteCost = await fetch('/delete-cost', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `costId=${costToDelete._id}`
        });
        console.log(deleteCost)
        var response = await deleteCost.json()
        console.log('has document been deleted', response.result)

        setPageUpdate(true)
        props.onClickButton(response)
        setModalConfirmDelete(!modalConfirmDelete)
    }

    return (

        <div>
            <NavBarMain />
            <h1 style={{ marginTop: "50px", marginBottom: "20px", textAlign: 'center' }}>Visualisez les revenus et coûts de votre investissement</h1>
            <Container fluid>
                <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: '30px' }}>
                    {/******************************INSERT GRAPH*************************************** */}

                    <Col lg='6' style={{ position: 'relative', height: '52vh' }}>
                        <div style={{ textAlign: 'center' }} >
                            Mois en cours (décembre)
                        </div>
                        <Doughnut />
                    </Col>
                    <Col lg='6' style={{ position: 'relative', height: '52vh' }}>
                        <div style={{ textAlign: 'center' }} >
                            Année en cours (2021)
                        </div>
                        <LineChart />
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px', paddingBottom: '10px' }}><Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Détails</h3>
                    <Button
                        style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}
                        onClick={() => toggle()}
                    >
                        Ajouter une depense
                    </Button>
                </Col></Row>
                <Row style={{ overflow: 'auto' }}>
                    <Table><thead style={{ borderBottomColor: '#FFB039', position: 'sticky', top: '0', backgroundColor: '#FFB039', color: '#FFFFFF' }}><tr><th style={{ width: '25%' }}>Status</th><th style={{ width: '25%' }}>Description</th><th style={{ width: '25%' }}>Montant</th><th style={{ width: '25%' }}>Date</th><th>Supprimer</th></tr></thead><tbody>

                        {financeList.map((finance) => {
                            if (finance.type === 'fixedCost') {
                                var badgeColor = 'danger'
                                var badgeTitle = 'Coût mensuel'
                            } else if (finance.type === 'variableCost') {
                                badgeColor = 'danger'
                                badgeTitle = 'Coût ponctuel'
                            } else {
                                badgeColor = 'success'
                                badgeTitle = 'Loyer'
                            }
                            return (
                                <tr><th scope="row"><Badge pill color={badgeColor} style={{ width: '100px' }} >{badgeTitle}</Badge></th><td>{finance.description}</td><td>{finance.montant}€</td><td>{new Date(finance.dateDebut).toLocaleDateString()}</td><td><FaTrashAlt className="trash" onClick={() => toggleModalConfirmDelete(finance)} style={{ marginRight: "5px", cursor: "pointer" }}></FaTrashAlt></td></tr>
                            )
                        })}

                    </tbody>
                    </Table>
                </Row>
            </Container>
            <Modal isOpen={modal}
            >
                <ModalHeader style={{ justifyContent: 'center' }} >
                    Ajouter une dépense
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup> <Input onChange={(e) => setCostDescription(e.target.value)} placeholder="Description" type="string" /></FormGroup>
                        <FormGroup> <Input onChange={(e) => setCostAmount(parseInt(e.target.value))} placeholder="Cost" type="number" /></FormGroup>
                        <FormGroup> <Input onChange={(e) => setCostFrequence(parseInt(e.target.value))} placeholder="Fréquence" type="select"><option value="" disabled selected>Fréquence</option><option>Ponctuelle</option><option>Mensuelle</option><option>Trimestrielle</option><option>Annuelle</option></Input></FormGroup>
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
                        Annuler
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalConfirmDelete}
            >
                <ModalHeader style={{ justifyContent: 'center' }} >
                    Confirmer la suppression
                </ModalHeader>
                <ModalBody>

                    Souhaitez-vous supprimer cette dépense ?

                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}
                        onClick={() => clickToDeleteCost(costToDelete)}
                    >
                        Supprimer
                    </Button>
                    {' '}
                    <Button onClick={() => toggleModalConfirmDelete()}>
                        Annuler
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onClickButton: function (clickDescription) {
            console.log('passed to reducer:', clickDescription)
            dispatch({ type: 'update', update: clickDescription })

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
