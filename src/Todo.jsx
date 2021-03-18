import React from 'react';
import moment from 'moment'
import { Checkbox, Button, Row, Col, Card } from "antd";

const Todo = ({ todo, toggleCompletion, handleTodoDelete }) => {

  const handleToggleCompletion = (e) => {
    toggleCompletion(todo.id, todo.ref, e.target.checked)
  }

  const onRemove = () => {
    handleTodoDelete(todo.id, todo.ref);
  }

  return (
      <Row>
        <Col span={10}>
        <Card title={todo.id + '. ' + todo.task}>
          <p>{todo.ref && <span>@{todo.ref}</span>}</p>
          완료: <Checkbox checked={todo.completed} onChange={handleToggleCompletion}/>
          <p>작성일:{moment(todo.createdAt).format('YYYY-MM-DD')}</p>
          <Button onClick={onRemove}>삭제</Button>
        </Card>
        </Col>
      </Row>
  )
}

export default Todo;
