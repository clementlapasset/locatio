import React from 'react'
import NavBarHome from '../components/NavBarHome';
import '../App.css'
import { Card, CardBody, CardTitle, CardText, Button, Container, Row, Col } from 'reactstrap';



export default function Homepage() {

  return (
    <div style={{ height: '100vh' }}>

      <NavBarHome />

      <Container fluid className='g-0'>

        <Row style={{ backgroundColor: 'rgb(235, 238, 242)' }}>
          <Col xs='7'>
            <Card style={{ marginTop: '100px', marginLeft: '50px', marginRight: '50px' }}>
              <CardBody>
                <CardTitle tag="h1">Gérez en toute simplicité votre investissement locatif avec Locatio</CardTitle>
                <CardText style={{ marginBottom: '300px' }}>En rassemblant en un seul lieu toutes les informations liées à la gestion de votre bien et en facilitant un maximum de démarches du propriétaire bailleur, Locatio est l’outil indispensable des particuliers qui louent un bien.</CardText>
                <Button style={{ backgroundColor: '#00C689', borderColor: '#00C689' }}>Sign-up</Button>
              </CardBody>
            </Card>
          </Col>
          <Col xs='5'>
            <div className='buildingImage' />
          </Col>
        </Row>
      </Container>
    </div>

  )
}
