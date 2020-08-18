import React, { useState } from 'react';
import { 
    Form, 
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import isObject from '../../../util/isObject'; 
import FormInputGroup from '../components/FormInputGroup';

const SignUpForm = () => {
    //represents whether the user is signing up
    //as a seller or as a buyer
    const [ asSeller, setAsSeller ] = useState( false );
    //the store url to be according to the name
    const [ storeUrl, setStoreUrl ] = useState( 'gulait.com/store/' );

    /**
     * Adds or removes seller signup support
     * @param { Object } event the event that was activated 
     * @return { void } 
     */
    const handleSignUpSeller = ( event ) => {
        if( isObject( event.currentTarget ) ){
            //toggle asSeller
            setAsSeller( event.currentTarget.checked );
        }
    }

    /**
     * Updates what the store url will be as the name changes
     * @param { Object } event the event that was activated 
     * @return { void } 
     */
    const updateStoreUrl = ( event ) => {
        const storeNameElem = event.currentTarget;
        if( isObject( storeNameElem ) && asSeller ){
            //change to lowercase and replace a space with a hyphen
            setStoreUrl( `gulait.com/store/${ storeNameElem.value.toLowerCase().replace( / /g, '-' ) }` );
        }
    }

    /**
     * Adds Seller sign up support to the sign up form
     * @return { void }
     */
    const sellerSignUpSupport = () => {
        if( !asSeller ) return;
        console.log( `User is a: ${ asSeller }` );
        return (
            <>
                <Form.Group controlId='store-email'>
                    <Form.Control type='email' placeholder='Store email'/>
                    <Form.Text className='text-muted'>
                        Is it the same as your personal email? You can leave it blank.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId='store-name'>
                    <Form.Control type='text' placeholder='Store name.'  onChange={ updateStoreUrl } required />
                    <Form.Text className='text-muted'>
                        This cannot be changed.<br></br>
                        store url: <strong className='tiny-text' >{ storeUrl }</strong>
                    </Form.Text>
                </Form.Group>
            </>
        );
        
    }

    /**
     * Creates an html element for the comfirm password Form.Text content
     * @return { HTMLElement } Returns an html element for the comfirm password Form.Text content
     */
    const comfirmPasswordText = () => {
         return ( <p className='tiny-text'><strong className='tiny-text' > Re-enter your password </strong>to confirm it is correctly entered.</p> )
    } 


    return( 
        <Container>
            <Row className='center-children' >
                <img alt='logo' src='./images/png/logo.png' className='signup-page-logo'></img>
                <Col xs={11} sm={8} md={4} lg={4} xl={4}  className='sign-up-form-parent' >
                    <Form id='signup-form'>
                        <h6 className='gi-heading' style={ { textAlign: 'center' } }>Sign Up</h6>
                        <FormInputGroup id='user-name' control={ { type: 'text', placeholder: 'User name', required: true } } />
                        <FormInputGroup id='first-name' control={ { type: 'text', placeholder: 'First name', required: true } } />
                        <FormInputGroup id='last-name' control={ { type: 'text', placeholder: 'Last name', required: true } } />
                        <FormInputGroup id='personal-email' 
                            control={ { type: 'email', placeholder: 'Personal email', required: true } }
                            text={ { className: 'text-muted', content: 'Enter a valid email. You can enter your store email if no personal one is available. But you need to have access to it. This is only advised if you sign up as a seller.' } }
                        />
                        <FormInputGroup id='password' 
                            control={ { type: 'password', placeholder: 'Password', required: true } }
                            text={ { className: 'text-muted', content: `Create a password that's easy to remember but tough for others to guess.` } }
                        />
                        <FormInputGroup id='confirm-password' 
                            control={ { type: 'password', placeholder: 'Confirm password', required: true } }
                            text={ { className: 'text-muted', content: comfirmPasswordText() } }
                        />
                        <FormInputGroup id='signup-seller' check={ { type: 'checkbox', label: 'Be a Seller', onClick: handleSignUpSeller } } />
                        { sellerSignUpSupport() }
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