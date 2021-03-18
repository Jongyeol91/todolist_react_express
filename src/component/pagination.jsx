import React from 'react'
import { Row } from 'antd'

const Pagination = ({perPage, totalTodos, paginate}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / perPage); i++) {
    pageNumbers.push(i)
  }

  return (
      <Row style={{marginLeft: '10px'}}>
          {pageNumbers.map((number) => (
              <div key={number} onClick={() => paginate(number)} style={{border: '1px solid gray', padding: '10px'}}>
                <a href='#none' >
                  {number}
                </a>
              </div>
          ))}
      </Row>
  )
}

export default Pagination;
