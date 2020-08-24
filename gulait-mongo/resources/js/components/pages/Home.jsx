import React from 'react';
import SearchField from '../../components/Searchfield';
import { Container } from 'react-bootstrap';

const Home = () => {


    return ( 
        <Container className='home-container' >
            <h5 className='home-title gi-heading' > Find Products Near You </h5>
            <SearchField/>
        </Container> 
    );
}

export default Home;