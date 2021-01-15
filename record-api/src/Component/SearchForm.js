import React from "react";
import { Col, Form } from "react-bootstrap";

const SearchForm = ({ searchValue,handleSearchChange }) => {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Search Form</Form.Label>
          <Form.Control
            onChange={handleSearchChange}
            value={searchValue}
            name="Gender"
            type="text"
          />
        </Form.Group>       
      </Form.Row>
    </Form>
  );
};
export default SearchForm;
