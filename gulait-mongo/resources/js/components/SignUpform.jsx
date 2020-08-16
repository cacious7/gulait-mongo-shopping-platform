import React from 'react';
import { 
    Form, 
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
    /**
     * 
     * @param { Object } event the event that was activated 
     * @return { void } 
     */
    const handleSignUpSeller = ( event ) => {
        event.preventDefault();
        console.log( event.currentTarget );
        alert( 'Clicked' );
    }

    return( 
        <Container>
            <Row className='center-children' >
                <img alt='logo' src='./images/png/logo.png' className='signup-page-logo'></img>
                <Col xs={11} sm={8} md={4} lg={4} xl={4}  className='sign-up-form-parent' >
                    <Form id='signup-form'>
                        <h6 className='gi-heading' style={ { textAlign: 'center' } }>Sign Up</h6>
                        <Form.Group controlId='user-name'>
                            <Form.Control type='text' placeholder='User name' required />
                        </Form.Group>
                        <Form.Group controlId='first-name'>
                            <Form.Control type='text' placeholder='First name' required />
                        </Form.Group>
                        <Form.Group controlId='last-name'>
                            <Form.Control type='text' placeholder='Last name' required />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Control type='email' placeholder='email' required />
                            <Form.Text className='text-muted'>
                                Enter a valid email.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Control type='password' placeholder='Password' required />
                            <Form.Text className='text-muted'>
                                Create a password that's easy to remember but tough for others to guess.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId='signupSeller'>
                            <Form.Check type='checkbox' label='Be a Seller' onClick = { handleSignUpSeller } />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Sign Up
                        </Button>
                        <Form.Text className='text-muted' style={ { marginTop: '2rem' } }>
                            Already have an account? <Link to='/login' className='tiny-text' ><strong>Login here.</strong></Link>
                        </Form.Text>
                        <div className='auth-page-policies' >
                            <Form.Text className='center-children' style={ { marginTop: '1rem', color: '#0f0f0f' } }>
                                <Link to='/login' className='tiny-text text-muted' >Privacy</Link> | <Link to='/login' className='tiny-text text-muted' >Terms of Service</Link>
                            </Form.Text>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default SignUpForm;