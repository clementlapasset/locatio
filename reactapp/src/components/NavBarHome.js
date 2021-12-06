import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand, Nav, NavLink, NavItem } from 'reactstrap';

export default function NavBarHome() {
    return (
        <Navbar style={{backgroundColor:'#2A327D', justifyContent:'space-between'}}>
        <NavbarBrand style={{color:'#FFFFFF'}}><img src='https://placeholder.com/40' style={{padding:'10px'}}/>Locatio</NavbarBrand>
        <Nav>
        <NavItem>
        <NavLink style={{color:'#FFFFFF'}}href="/sign-in">Login</NavLink></NavItem>
        <Nav pills ><NavItem style={{marginRight:'20px'}}><NavLink style={{backgroundColor:'#00C689'}} active href="/sign-up" >Sign-up</NavLink></NavItem></Nav>
        </Nav>
        </Navbar>
    )
}

