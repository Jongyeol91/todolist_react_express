import React from 'react';
import {Checkbox, Button, Row, Col} from "antd";

const Todo = ({todo, toggleCompletion, removeTask}) => {

  const handleToggleCompletion = () => {
    toggleCompletion(todo.id, todo.ref)
  }

  const handleRemove = () => {
    removeTask(todo.id, todo.ref);
  }

  return (
      <Row>
        <Col span={24}>
          <h2>{todo.id}. {todo.task}</h2>
          <h3>{todo.ref && <span>@{todo.ref}</span>}</h3>
          <Checkbox checked={todo.completed} onChange={handleToggleCompletion}/>
          <Button onClick={handleRemove}>삭제</Button>
        </Col>
      </Row>
  )
}

export default Todo;
