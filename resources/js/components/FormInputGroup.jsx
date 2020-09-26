import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * Creates a react bootstrap Form.Group component easily
 * @param {Object} props has the properties passed to this component
 * @return { HTMLElement } 
 */
const FormInputGroup = ( props ) => {

    /**
     * Throws an Error if a type property is ommited from one of the component's
     * properties object
     * @param { Object } props properties passed to the component 
     * @param { String } prop the property to check for a type attribute
     * @throws { Error } an error indicating that a type property is required
     * @returns { void }
     */
    const throwErrorIfNoType = ( props, prop ) => {
        if( !props[ prop ].type || props[ prop ].type == '' ) throw new Error( `formInputGroup ${ prop }'s type property is required` );
    }

    /**
     * Creates a Form.Check react-bootstrap element
     * @param { Object } props  properties passed to the component
     * @returns { HTMLElement }
     */
    const createFormCheck = ( props ) => {
        //create Form.Check element
        if( props.hasOwnProperty( 'check' ) ){
            //throw an error if type is not defined
            throwErrorIfNoType( props, 'check' );
            //trows an error if label is not defined or empty
            if( !props.check.label || props.check.label == '' ) throw new Error( `formInputGroup check's label property is required` );

            return (
                <Form.Check 
                    type={ props.check.type }
                    className={ props.check.className ? props.check.className : 'empty' } 
                    label= { props.check.label }
                    onClick={ props.check.onClick ? props.check.onClick : () => {} }
                    onChange={ props.check.onChange ? props.check.onChange : () => {} }
                    onFocus={ props.check.onFocus ? props.check.onFocus : () => {} } 
                />
            );
        }
    }

    /**
     * Creates a Form Control element based on the props provided
     * @param { Object } props properties passed to the component
     * @return { HTMLElement }
     */
    const createFormControl = ( props ) => {
        //create Form.Control element
        if( props.hasOwnProperty( 'control' ) ){
            //throw an error is type is not defined
            throwErrorIfNoType( props, 'control' );

            return ( 
                <Form.Control 
                    type={ props.control.type }
                    className={ props.control.className ? props.control.className : 'empty' } 
                    placeholder={ props.control.placeholder ? props.control.placeholder : '' } 
                    required={ props.control.required ? props.control.required : false }
                    onClick={ props.control.onClick ? props.control.onClick : () => {} }
                    onChange={ props.control.onChange ? props.control.onChange : () => {} }
                    onFocus={ props.control.onFocus ? props.control.onFocus : () => {} } 
                />
            );
        }
    }

    /**
     * Creates a Form Text element based on the props provided
     * @param { Object } props properties passed to the component
     * @return { HTMLElement }
     */
    const createFormText = ( props ) => {
        //create Form.Text element
        if( props.hasOwnProperty( 'text' ) ){
            return (
                <Form.Text className={ props.text.className ? props.text.className : 'empty' } >
                    { props.text.content }
                </Form.Text>
            );
        }
    }

    /**
     * Creates child elements based on properties passed to the component
     * @param { Object } props properties passed to the component from which to create child elements
     * @return { HTMLElement } 
     */
    const formGroup = ( props ) => {
        return ( 
            <Form.Group controlId={ props.id }>
                { createFormControl( props ) }
                { createFormText( props ) }
                { createFormCheck( props ) }
            </Form.Group>
         );
    }

    return formGroup( props );
}

export default FormInputGroup;