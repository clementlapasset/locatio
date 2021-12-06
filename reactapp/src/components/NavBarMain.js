import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand, Nav, NavLink, NavItem, NavbarText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

export default function NavBarMain() {
    return (
        <Navbar style={{backgroundColor:'#2A327D', justifyContent:'space-between'}}>
        <NavbarBrand style={{color:'#FFFFFF', marginLeft:'20px'}}><img src='https://placeholder.com/40' style={{padding:'10px'}}/>Locatio</NavbarBrand>
        <Nav>
        <NavItem style={{paddingInline: '20px'}}><NavLink style={{color:'#FFFFFF'}}href="/documents">Documents</NavLink></NavItem>
        <NavItem style={{paddingInline: '20px'}}><NavLink style={{color:'#FFFFFF'}}href="/charges">Charges</NavLink></NavItem>
        <NavItem style={{paddingInline: '20px'}}><NavLink style={{color:'#FFFFFF'}}href="/finance">Finance</NavLink></NavItem>
        <NavItem style={{paddingInline: '20px'}}><NavLink style={{color:'#FFFFFF'}}href="/incidents">Incidents</NavLink></NavItem>
        </Nav>
        <Nav>
        <NavItem><NavLink href="/sign-in"><FontAwesomeIcon icon={faPowerOff} size={'lg'} inverse style={{marginTop:'3px'}} /></NavLink></NavItem>
        <NavbarText style={{color:'#00C689'}}>Déconnexion</NavbarText>
        </Nav>
        </Navbar>
    )
}