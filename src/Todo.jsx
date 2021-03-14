import React from 'react';

const Todo = ({ todo }) => {
  return (
      <div>
        <h2>{todo.task}</h2>
        <input type="checkbox"/>
      </div>
  )
}

export default Todo;
