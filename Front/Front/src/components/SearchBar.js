import React from 'react';
import { Row, InputGroup, Button, FormControl } from 'react-bootstrap';
import  "../stylesheets/main.scss"


const SearchBar = ({setQ, searchVideos, q}) => {
    const setValue = (e) => {
        const value = e.target.value;
        setQ(value);
    }
    return (

        <Row>
        <InputGroup className="buttonPesquisaCss">
          <Button variant="outline-secondary" id="button-addon1" onClick={() => {searchVideos({q})}}>
            Pesquisar
          </Button>
          <FormControl
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            onChange={setValue}
          />
        </InputGroup>
      </Row>
    //     <Container>
    //     <SearchInput data-testid="input" onChange={setValue}/>
    //     <button onClick={() => {searchVideos({q})}} >Buscar</button>
    // </Container>
    )
  
}

export default SearchBar;