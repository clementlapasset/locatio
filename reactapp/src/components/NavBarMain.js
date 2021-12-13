import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand, Nav, NavLink, NavItem, NavbarText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default function NavBarMain() {
    return (
        <Navbar style={{ backgroundColor: '#2A327D', justifyContent: 'space-between' }}>
            <NavbarBrand style={{ color: '#FFFFFF', marginLeft: '20px' }}><img src='../images/rent.png' style={{ padding: '10px' }} alt="" href="/" />Locatio</NavbarBrand>
            <Nav>
                <NavItem style={{ paddingInline: '20px' }}><NavLink style={{ color: '#FFFFFF' }} href="/documents">Documents</NavLink></NavItem>
                <NavItem style={{ paddingInline: '20px' }}><NavLink style={{ color: '#FFFFFF' }} href="/charges">Charges</NavLink></NavItem>
                <NavItem style={{ paddingInline: '20px' }}><NavLink style={{ color: '#FFFFFF' }} href="/finances">Finance</NavLink></NavItem>
                <NavItem style={{ paddingInline: '20px' }}><NavLink style={{ color: '#FFFFFF' }} href="/incidents">Incidents</NavLink></NavItem>
            </Nav>
            <Nav>
            <NavLink href="/information-property"><NavItem><FontAwesomeIcon icon={faUserCircle} size={'lg'} inverse style={{ marginTop: '3px' }} />
                <NavbarText style={{ color: '#FFFFFF', fontSize:'15px', margin:'5px' }}>Mon compte</NavbarText></NavItem></NavLink>
                <NavLink href="/"><NavItem><FontAwesomeIcon icon={faPowerOff} size={'lg'} inverse style={{ marginTop: '3px' }} />
                <NavbarText style={{ color: '#FFFFFF', fontSize:'15px', margin:'5px' }}>Déconnexion</NavbarText></NavItem></NavLink>
            </Nav>
        </Navbar>
    )
}