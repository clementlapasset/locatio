import React from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import NavBarMain from '../components/NavBarMain'
export default function Charges() {
    return (
        <div style={{height:'100vh'}}>
            <NavBarMain/>
            <Container>
              <Row style={{marginTop: '30px'}}><Col lg={{size:6, offset:'8'}}><Button>Ce mois-ci</Button>{' '}<Button>Cette année</Button></Col></Row>
              <Row><Col></Col></Row>
              <Row></Row>
              <Row></Row>
            </Container>
        </div>
    )
}
