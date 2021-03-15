import React from 'react';
import { Checkbox, Button } from "antd";

const Todo = ({ todo, toggleCompletion, remove }) => {

  const handleToggleCompletion = () => {
    toggleCompletion(todo.id)
  }

  const handleRemove = () => {
    remove(todo.id);
  }

  return (
      <div>
        <h2>{todo.task}</h2>
        <Checkbox checked={todo.completed} onChange={handleToggleCompletion}/>
        <Button onClick={handleRemove}>삭제</Button>
      </div>
  )
}

export default Todo;
