import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavLink, NavItem, NavbarText, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faUserCircle, faHouseUser } from '@fortawesome/free-solid-svg-icons'

export default function NavBarMain() {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <Navbar style={{ backgroundColor: '#2A327D', justifyContent: 'space-between' }}>
            <NavLink href="/">
                <NavbarBrand style={{ color: '#FFFFFF', marginLeft: '20px' }}><FontAwesomeIcon icon={faHouseUser} size={'lg'} inverse style={{ marginRight: '15px' }} />Locatio</NavbarBrand>
            </NavLink>
            <Nav>
                <NavItem style={{ paddingInline: '2vw' }}><Link style={{ color: '#FFFFFF' }} to="/documents">Documents</Link></NavItem>
                <NavItem style={{ paddingInline: '2vw' }}><Link style={{ color: '#FFFFFF' }} to="/charges">Charges</Link></NavItem>
                <NavItem style={{ paddingInline: '2vw' }}><Link style={{ color: '#FFFFFF' }} to="/finances">Finances</Link></NavItem>
            </Nav>
            <Nav>
                <NavLink id="PopoverMyAccount" style={{ color: 'white', cursor: "pointer" }}>
                    <NavItem>
                        <FontAwesomeIcon icon={faUserCircle} size={'lg'} inverse style={{ marginTop: '3px' }} />
                        <NavbarText style={{ color: '#FFFFFF', fontSize: '15px', margin: '5px' }}>Mon compte</NavbarText>
                    </NavItem>
                </NavLink>
                <Popover
                    flip
                    placement="bottom"
                    target="PopoverMyAccount"
                    isOpen={popoverOpen}
                    toggle={toggle}
                    trigger="click"
                >
                    <PopoverHeader>
                        Accéder à mes informations
                    </PopoverHeader>
                    <PopoverBody style={{ padding: '0', textAlign: 'center' }}>
                        <ListGroup>
                            <ListGroupItem>
                                <Link to="/information-property">
                                    Informations du bien
                                </Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Link to="/information-location">

                                    Revenus et coûts mensuels

                                </Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Link to="/information-tenant">

                                    Informations locataire(s)

                                </Link>
                            </ListGroupItem>
                        </ListGroup>
                    </PopoverBody>
                </Popover>
                <NavLink href="/">
                    <NavItem>
                        <FontAwesomeIcon icon={faPowerOff} size={'lg'} inverse style={{ marginTop: '3px' }} />
                        <NavbarText style={{ color: '#FFFFFF', fontSize: '15px', margin: '5px' }}>Déconnexion</NavbarText>
                    </NavItem>
                </NavLink>
            </Nav>
        </Navbar>
    )
}