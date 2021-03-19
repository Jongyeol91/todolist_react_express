import React from 'react';
import {Row, Col, Input } from "antd";

const Search = ({ todos, setSearchTerm }) => {

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  }

  return(
    <Row>
      검색:
      <input type='text' onChange={onChangeSearchTerm}/>
    </Row>
  )
}

export default Search;
