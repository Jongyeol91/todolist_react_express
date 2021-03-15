import React from 'react';
import {Checkbox} from "antd";

const Todo = ({ todo, toggleCompletion }) => {

  const handleToggleCompletion = () => {
    toggleCompletion(todo.id)
  }

  return (
      <div>
        <h2>{todo.task}</h2>
        <Checkbox checked={todo.completed} onChange={handleToggleCompletion}/>
      </div>
  )
}

export default Todo;
