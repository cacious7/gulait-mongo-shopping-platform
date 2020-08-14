import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SignUpForm = () => {
    return( 
        <Form id='signup-form'>
            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter your email' required />
                <Form.Text className='text-muted'>
                    We'll never share your email.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' required />
            </Form.Group>
            <Form.Group controlId='signupSeller'>
                <Form.Check type='checkbox' label='Be a Seller' />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Sign Up
            </Button>
        </Form>
     );
}

export default SignUpForm;