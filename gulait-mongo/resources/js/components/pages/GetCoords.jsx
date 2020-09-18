import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import getCoords from '../../../../util/getCoords';

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
                <div className='p-5 pt-2' style={ { background: 'white', borderRadius: '.75rem', border: '.12rem solid black' } }>
                    <p><strong>Latitude: </strong>{ location.latitude }</p>
                    <p><strong>Longitude: </strong>{ location.longitude }</p>
                </div>
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