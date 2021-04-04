import React from 'react';
import moment from 'moment'
import { Checkbox, Button, Row, Col, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUpdateTodoActionCreator } from "../reducers/todolist";

const Todo = ({ todo, handleTodoCompletion, handleTodoDelete }) => {
  const dispatch = useDispatch();

  const onTodoCompletion = (e) => {
      handleTodoCompletion(todo.id, todo.ref, e.target.checked)
  }

  const onRemove = () => {
    handleTodoDelete(todo.id, todo.ref);
  }

  const onUpdate = () => {
    dispatch(getUpdateTodoActionCreator({todo}));
  }

  return (
      <Row>
        <Col span={10}>
        <Card title={todo.id + '. ' + todo.todo}>
          <p>{todo.ref && <span>{todo.ref.split(',').map(cv => (<span>@{cv} </span>))}</span>}</p>
          완료: <Checkbox checked={todo.completed} onChange={onTodoCompletion}/>
          <p>작성일:{moment(todo.createdAt).format('YYYY-MM-DD')}</p>
          <Button onClick={onRemove}>삭제</Button>
          <Button onClick={onUpdate}>수정</Button>
        </Card>
        </Col>
      </Row>
  )
}

export default Todo;
