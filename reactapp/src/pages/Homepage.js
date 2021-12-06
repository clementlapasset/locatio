import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarHome from '../components/NavBarHome';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';


export default function Homepage() {

    return (
    <div>
      <NavBarHome/>
      <div>
      <div>
      <Card>
      <CardBody>
      <CardTitle tag="h5">Card title</CardTitle>
      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
      <Button onClick={function noRefCheck(){}}>Button</Button>
      </CardBody>
      </Card>
      </div>
      <div>
      <img src='../homepage.jpg' alt=""/>
      </div>
      </div>
    </div>
        
        
    )
}
