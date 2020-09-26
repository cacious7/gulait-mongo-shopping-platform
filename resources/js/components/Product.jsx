import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useQuery } from 'react-query';
import getHostUrl from '../../../util/getHostUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmbededGoogleMap from './EmbededGoogleMap';

const Product = ( props ) => {
    const [ show, setShow ] = useState( false );
    const { 
        status, 
        data, 
        isFetching, 
        error
    } = useQuery( props.product.storeId, () => getStore() );

    console.log( status, data );

    if( status == 'error' ) console.log( 'error while loading store', error );

    /**
     * Searches for a store that matches an id
     * @return { Object } The search results
     */
    const getStore = async () => {
        const res = await axios( {
            method: 'post',
            url: `${ getHostUrl() }/store/search`,
            data: { id: props.product.storeId },
            headers: { 'Content-Type': 'application/json' }
        } );

        return res;
    }

    /**
     * Displays a modal to show seller contact details
     * @return { Void }
     */
    const handleOpen = () => setShow( true );

    /**
     * Hides a modal to hide seller contact details
     * @return { Void }
     */
    const handleClose = () => setShow( false );

    const displaySellerDetails = () => {
        const store = data.data.data;

        console.log( 'product coords = ', props.product.location );

        return ( 
            <>
                <p><strong>Store name:</strong> { store.name }</p>
                <p><strong>Email:</strong> { store.email }</p>
                <p><strong>Phone:</strong> +{ store.phone.countryCode } { store.phone.number }</p>
                <EmbededGoogleMap   
                    location={ props.product.location } 
                    className='modal-google-map' 
                />
            </>
         );
    }

    return (
        <> 
            <Card className='product' onClick={ handleOpen } >
                { props.product.imgUrl ? <Card.Img variant='top' src={ props.product.imgUrl } /> : '' }
                <Card.Body className='center-children' >
                    <Card.Title>{ props.product.name }</Card.Title>
                </Card.Body>
                <div className='overlay center-children' > <FontAwesomeIcon icon={ [ 'fas', 'plus' ] } size='lg' /> </div>
            </Card>
            <Modal className='product-seller-details ' show={ show } onHide={ handleClose }>
                <Modal.Header closeButton>
                <Modal.Title className='gi-heading' > Seller Contact Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>{ isFetching ? 'Loading...' : displaySellerDetails() }</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={ handleClose }>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
    
}

export default Product;