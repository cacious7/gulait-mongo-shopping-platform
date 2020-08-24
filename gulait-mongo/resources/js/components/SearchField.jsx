import React from 'react';
import {
    Form,
    FormControl,
    InputGroup,
    Dropdown,
    DropdownButton
} from 'react-bootstrap';

const SearchField = () => {

    const handleSubmit = ( event ) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log( 'Search form= ', form );
    }

    return (
        <Form onSubmit={ handleSubmit } >
            <InputGroup className=" search-field mb-3">
                <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title="Categories"
                id="input-group-dropdown-1"
                >
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Separated link</Dropdown.Item>
                </DropdownButton>
                <FormControl aria-describedby="basic-addon1" placeholder='Search for a product' />
            </InputGroup>
        </Form>
    );
}

export default SearchField;