import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavLink, NavItem, Button, Input, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'


function NavBarHome(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [id, setId] = useState('')

  let navigate = useNavigate();


  var handleSubmitSignin = async () => {
    const data = await fetch('/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${signInEmail}&password=${signInPassword}`
    })

    const body = await data.json()

    if (body.result === true) {
      props.addToken(body.token)
      setUserExists(true)
      setId(body.token)
    } else {
      setErrorsSignin(body.error)
      console.log(body)
    }
  }

  if (userExists) {
    navigate('/finances');
  }

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return (<p>{error}</p>)
  })


  return (
    <Navbar style={{ backgroundColor: '#2A327D', justifyContent: 'space-between' }}>
      <NavbarBrand style={{ color: '#FFFFFF' }}><Link to="/" style={{ textDecoration: 'none', color: 'white' }}><FontAwesomeIcon icon={faHouseUser} size={'lg'} inverse style={{ marginRight: '15px' }} />Locatio</Link></NavbarBrand>
    </Navbar>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NavBarHome)