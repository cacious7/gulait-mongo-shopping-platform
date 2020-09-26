import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import getCoords from '../../../../util/getCoords';
import EmbededGoogleMap from '../EmbededGoogleMap';
import { Card } from 'react-bootstrap';

const GetCoords = () => {
    const [ location, setLocation ] = useState( { latitude: null, longitude: null } );
    
    /**
     * Get coordinates
     */
    useEffect( () => {
        getCoords( setCoords );
    }, [] );

    const setCoords = ( position ) => {
        setLocation( { longitude: position.coords.longitude, latitude: position.coords.latitude } );
    }

    const renderCoords = () => {
        if( location.latitude && location.longitude ){
            return (
                <>
                    <div className='p-5' style={ { background: 'white', borderRadius: '.75rem', border: '.12rem solid black' } }>
                        <p><strong>Latitude: </strong>{ location.latitude }</p>
                        <p className='mb-0' ><strong>Longitude: </strong>{ location.longitude }</p>
                    </div>
                    <br/>
                    <Card style={ { width: '100%' } } >
                        <Card.Body>
                            <EmbededGoogleMap style={ { height: '90vh'} } location={ location } className='modal-google-map' />
                        </Card.Body>
                    </Card>
                    <br/>
                </>
            );
        } else {
            return ( <p>Loading...</p> );
        }
    }

    return (
        <Container className='center-children mt-5' >
                { renderCoords() }
        </Container>
    );
}

export default GetCoords;