import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../img/logo.png'
import styles from './Menu.module.css'


const Menu = () => {
  return (
    <Navbar expand="md" className={`${styles.backgroundMenu}`}>
      <Container >
        <Navbar.Brand className='d-flex align-items-center m-0 gap-2 justify-content-center text-white ' href="#home"><img src={logo} width={70} alt="adote um pet" />Adote um Pet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex flex-column align-items-center d-md-flex flex-md-row justify-content-md-end">
            <Nav.Link><Link className='fw-bold text-decoration-none text-white' to={'/'}>Home</Link></Nav.Link>
            <Nav.Link><Link className='fw-bold text-decoration-none text-white' to={'/login'}>Login</Link></Nav.Link>
             <Nav.Link><Link className='fw-bold text-decoration-none text-white' to={'/cadastrar'}>Cadastrar</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;