import React, { useState } from 'react';
import { Row } from 'antd';
import styled from 'styled-components'

const Pagination = ({ perPageTodos, totalTodos, paginate, currentPage, minPageNum, maxPageNum, handleNext, handlePrevious }) => {
  const pageNumbers = [];

  const StyledDiv = styled('div')`
     border: 1px solid gray;
     padding: 10px;
     cursor: pointer;
     background: ${(props) => props.color || 'white'}
  `;

  for (let i = 1; i <= Math.ceil(totalTodos / perPageTodos); i++) {
    pageNumbers.push(i)
  }

  return (
      <Row style={{marginLeft: '10px'}}>
        <button onClick={handlePrevious}>이전</button>
        {pageNumbers.map((number) => {
          if (minPageNum < number && maxPageNum >= number) { // 페이지네이션 숫자(버튼) 노출 범위 (1~5)
            return (
                <StyledDiv key={number} color={number === currentPage ? 'lightgray' : null} onClick={() => paginate(number)}>
                  <a href='#none'>
                    {number}
                  </a>
                </StyledDiv>
            )
          }
        })}
        <button onClick={handleNext}>다음</button>
      </Row>
  )
}

export default Pagination;
