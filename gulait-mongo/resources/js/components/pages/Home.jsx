import React, { useState, useEffect } from 'react';
import SearchField from '../../components/Searchfield';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useQuery } from 'react-query';
import getHostUrl from '../../../../util/getHostUrl';
import Product from '../Product';

const Home = () => {
    const [ searchString, setSearchString ] = useState( '' );
    const [ searchMode, setSearchMode ] = useState( false );
    const { 
        status, 
        data, 
        isFetching, 
        productSearchError
    } = useQuery( searchString, () => getProducts() );

    /**
     * Searches for products whose name matches a search text
     * @return { Object } The search results
     */
    const getProducts = async () => {

        const res = await axios( {
            method: 'post',
            url: `${ getHostUrl() }/product/search`,
            data: { name: searchString },
            headers: { 'Content-Type': 'application/json' }
        } )
        
        return res;
    }

    /**
     * Display a list of products
     * @param { Array } products an array of products
     * @return { Array } A list of product elements
     */
    const displaySearchedProducts = ( products ) => {
        console.log( 'products= ', products );
        if( products.length == 0 ) return <h1>Results for that search were Not Found! Please try changing your search.</h1> ;

        const productElements = products.map( ( product, index ) => {
            return (
                <Product product={ product } key={ index } />
            );
        } );

        return productElements;
    }

    /**
     * Searches for a product
     * @param { Object } event an event that has been fired
     * @return { void }
     */
    const handleProductSearch = async ( event ) => {
        event.preventDefault();
        // let response = null;
        const form = event.currentTarget;
        setSearchString( form.value );

        if( !searchMode ) toggleSearchMode();

        console.log( 'search mode= ' + searchMode );
        console.log( 'Search String= ', form.value );
    }

    useEffect( () => {
        //if search mode is false and being turned to true,
        //then give the seach input box focus
        if( searchMode ){
            const searchField = document.getElementById( 'search-input-box' );
            console.log('search field = ', searchField);
            searchField.focus();
        }
    });

    /**
     * Toggles the searchMode between false and true
     * and focuses on the search input field when toggled to true
     * @param { Object } event an event that has been fired
     * @return { void }
     */
    const toggleSearchMode = ( event ) => {
        setSearchMode( !searchMode );
    }

    return ( 
        <Container className='home-container' >
            {
                searchMode ? 
                    <>
                        <SearchField 
                            className={ searchMode ? 'search-mode' : '' } 
                            searchMode={ searchMode } 
                            isFetching={ isFetching }
                            searchString= { searchString }
                            handleProductSearch={ handleProductSearch }
                            toggleSearchMode={ toggleSearchMode }
                        />
                        { status == 'success' ? displaySearchedProducts( data.data.data ) : <h5>Loading...</h5> }
                    </>
                :
                    <>
                        <h5 className='home-title gi-heading' > Find Products Near You </h5>
                        <SearchField handleProductSearch={ handleProductSearch } searchMode={ searchMode } toggleSearchMode={ toggleSearchMode }  />
                    </>
            }

            {
                isFetching ? console.log( 'isFetching= ' + status) : console.log( 'data= ', data )
            }
            
            
        </Container> 
    );
}

export default Home;