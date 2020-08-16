import React from 'react';
import { 
    Form, 
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap';

const SignUpForm = () => {
    return( 
        <Container>
            <Row className='center-children' >
                <img alt='logo' src='./images/png/logo.png' className='signup-page-logo'></img>
                <Col xs={11} sm={8} md={4} lg={4} xl={4}  className='sign-up-form-parent' >
                    <Form id='signup-form'>
                        <h6 className='gi-heading' style={ { textAlign: 'center' } }>Login</h6>
                        <Form.Group controlId='email'>
                            <Form.Control type='email' placeholder='Enter your email or username' required />
                            <Form.Text className='text-muted'>
                                We'll never share your email.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Control type='password' placeholder='Password' required />
                        </Form.Group>
                        <Form.Group controlId='signupSeller'>
                            <Form.Check type='checkbox' label='Be a Seller' />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Sign Up
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
     );
}

export default SignUpForm;