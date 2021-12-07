import React, {useEffect, useState} from 'react'
import { Button, Col, Container, Row, Table, Card, CardBody, CardText } from 'reactstrap'
import NavBarMain from '../components/NavBarMain'
import { BarChart } from '../components/BarChart'


export default function Charges() {

    const [financeList, setFinanceList] = useState([])
    const [totalProvisions, setTotalProvisions] = useState(0)
    const [totalCharges, setTotalCharges] = useState(0)


    useEffect(() => {
        async function loadData(){
            var rawResponse = await fetch('/finance/charges');
            var response = await rawResponse.json();
            setFinanceList(response)
            
            response.filter((element) => {
                if (element.type==='charge'){
                    
                }
            })
            
            var sumCharges = 0;
            var chargesOnInitialisation = response.forEach((element) => {
                if (element.type==='charge'){
                    sumCharges += element.montant
                }   
            })
            setTotalCharges(sumCharges)
            
            var sumProvisions = 0;
            var provisionsOnInitialisation = response.forEach((element) => {
                if (element.type==='provision'){
                    sumProvisions += element.montant
                }   
            })
            setTotalProvisions(sumProvisions)
               

        } loadData()
    }, [])


    return (

            <div style={{height:'100vh'}}>
            <NavBarMain/>
            <Container fluid>
              <Row style={{marginTop: '30px'}}><Col lg={{size:6, offset:'8'}}><Button style={{backgroundColor:'#00C689', borderColor: '#00C689'}}>Ce mois-ci</Button>{' '}<Button style={{backgroundColor:'#00C689', borderColor: '#00C689'}}>Cette année</Button></Col></Row>
              <Row style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Col md='6'>
              <Card>
              <CardBody style={{display:'flex', justifyContent:'space-between'}}>
              <div className='circleProvision'><CardText style={{color:'#FFFFFF', margin:'auto'}}>{totalCharges}€</CardText></div>
              <div className='circleCharges'><CardText style={{color:'#FFFFFF', margin:'auto'}}>{totalProvisions}€</CardText></div>
              <div className='circleTotal'><CardText style={{color:'#FFFFFF', margin:'auto'}}>{totalProvisions - totalCharges}€</CardText></div>
              </CardBody>
              <Button style={{backgroundColor:'#00C689', borderColor: '#00C689'}}>Regulariser Charges</Button>
              </Card>
              </Col>
              <Col md='6'><BarChart/></Col></Row>
              <Row style={{marginTop: '30px'}}><Col lg={{size:6, offset:'10'}}><Button style={{backgroundColor:'#00C689', borderColor: '#00C689'}}>Ajouter une charge</Button></Col></Row>
              <Row>
              <Table><thead><tr><th>Status</th><th>Description</th><th>Montant</th><th>Date</th></tr></thead><tbody>
              {/************************************** *************** add in map ********************************************************************/}
              {financeList.map((finance) => (
                <tr><th scope="row">1</th><td>{finance.description}</td><td>{finance.montant}</td><td>{finance.dateDebut}</td></tr>
              ))}
              </tbody>
              </Table>
              </Row>
            </Container>
        </div>
    )
}
