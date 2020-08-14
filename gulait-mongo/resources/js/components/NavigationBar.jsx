import React from 'react';
import {
    Navbar, 
    Nav, 
    Form, 
    FormControl, 
    Button
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar sticky='top' bg='light' expand='lg'>
            <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <NavLink to='/home'>Home</NavLink>
                    <NavLink to='/signup'>Signup</NavLink>
                </Nav>
                <Form inline>
                <FormControl type='text' placeholder='Search' className='mr-sm-2' />
                <Button variant='outline-success'>Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;