import React from 'react'
import {Form} from 'react-bootstrap'

const SearchBar = () => {
    return (
        <div style={{display:'grid',height:'60px',alignContent:'center',paddingRight:'20px',}}>
            <Form>
                <Form.Group  controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="search ....." />
                </Form.Group>
            </Form>

        </div>
    )
}

export default SearchBar;
