import React from 'react';
import {
    Form,
    FormControl,
    InputGroup,
    Dropdown,
    DropdownButton,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchField = ( props ) => {

    return (
        <>
            <Form>
                <InputGroup className={ `search-field mb-3 ${ props.className }`}>
                    {/* <DropdownButton
                    as={InputGroup.Prepend}
                    className='search-categories'
                    title="Categories"
                    id="input-group-dropdown-1"
                    >
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Separated link</Dropdown.Item>
                    </DropdownButton> */}
                    <FormControl 
                        value={ props.searchString } 
                        id='search-input-box'
                        onFocus={ props.handleProductSearch } 
                        onChange={ props.handleProductSearch }  
                        aria-describedby="Search for a product" 
                        placeholder='Search for a product' 
                    />
                    <InputGroup.Append>
                        <Button className='exit-search-mode' onClick={ props.toggleSearchMode }>
                            {
                                props.searchMode ? 
                                    props.isFetching ?
                                    <FontAwesomeIcon icon={ [ 'fas', 'times-circle' ] } spin />
                                    :
                                    <FontAwesomeIcon icon={ [ 'fas', 'times-circle' ] } />
                                :
                                    <FontAwesomeIcon icon={ [ 'fas', 'search' ] } />
                            }
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
            <br/>
        </>
    );
}

export default SearchField;