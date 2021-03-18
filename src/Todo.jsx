import React from 'react';
import { Checkbox, Button, Row, Col } from "antd";

const Todo = ({ todo, toggleCompletion, handleTodoDelete }) => {

  const handleToggleCompletion = (e) => {
    toggleCompletion(todo.id, todo.ref, e.target.checked)
  }

  const onRemove = () => {
    handleTodoDelete(todo.id, todo.ref);
  }

  return (
      <Row>
        <Col span={24}>
          <h2>{todo.id}. {todo.task}</h2>
          <h3>{todo.ref && <span>@{todo.ref}</span>}</h3>
          <Checkbox checked={todo.completed} onChange={handleToggleCompletion}/>
          <Button onClick={onRemove}>삭제</Button>
        </Col>
      </Row>
  )
}

export default Todo;
