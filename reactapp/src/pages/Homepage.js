import React from 'react'
import NavBarHome from '../components/NavBarHome';
import '../App.css'
import { Card, CardBody, CardTitle, CardText, Button, Container, Row, Col } from 'reactstrap';



export default function Homepage() {
    return (
      <Container fluid>
        <Row>
            <NavBarHome/>
        </Row>
        <Row style={{backgroundColor:'rgb(235, 238, 242)'}}>
            <Col xs='7'>
            <Card style={{marginTop:'100px', marginLeft: '50px', marginRight: '50px'}}>
            <CardBody>
            <CardTitle tag="h1">Card title</CardTitle>
            <CardText style={{marginBottom:'300px'}}>Description de l’app : Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte.</CardText>
            <Button style={{backgroundColor:'#00C689', borderColor: '#00C689'}}>Sign-up</Button>
            </CardBody>
            </Card>
            </Col>
            <Col xs='5'>
            <div className='buildingImage' />
            </Col>
        </Row>
      </Container>      
    )
}
