import React from 'react';
import styled from 'styled-components'

const StyledSearchInputWrapper = styled('div')`
     margin: 20px;
  `;

const Search = ({ todos, setSearchTerm }) => {
  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  }

  return(
    <StyledSearchInputWrapper>
      검색:
      <input type='text' onChange={onChangeSearchTerm}/>
    </StyledSearchInputWrapper>
  )
}

export default Search;
