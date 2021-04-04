import React, { useState, useEffect } from "react";
import { Button, Row } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import useInput from "../hooks/useInput";
import { clearUpdateActionCreator, getTodos, updateTodo } from "../reducers/todolist";

const StyledForm = styled('form')`
     margin: 30px;
  `;

const StyledTodoInput = styled('input')`
     margin-bottom: 10px;
  `;

const StyledRefSelect = styled('select')`
     margin-bottom: 10px;
  `;

const TodoForm = ({ handleTodoCreate }) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const editingTodo = useSelector(state => state.todos.editingTodo);

  const [todo, setTodo, onChangeTodo, todoErrMsg, resetTodo] = useInput({
    type: 'kor',
    maxLength: 20,
    minLength: 2,
    initialValue: '',
  });
  const [ref, setRef] = useState(new Set());

  useEffect(() => {
    if (editingTodo.todo) {
      setTodo(editingTodo.todo)
      editingTodo.ref && setRef(previousState => new Set([...editingTodo.ref.split(',')]))
    }
  }, [editingTodo])

  // 셀렉박스 참조 선택
  function onChangeSelect(e) {
    if (editingTodo.ref && editingTodo.id == e.target.value) {
        alert('스스로를 먼저해야 할 일에 넣을 수 없습니다.');
        return
    }
    setRef(previousState => new Set([...ref, e.target.value]))
    console.log(`selected ${e.target.value}`);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!editingTodo.todo) {
      handleTodoCreate(todo, ref);
    } else {
      await dispatch(updateTodo({id: editingTodo.id, todo: todo, ref: [...ref]}));
      dispatch(getTodos());
    }
    onCancelEditing();
  }

  const onCancelEditing = () => {
    dispatch(clearUpdateActionCreator());
    resetTodo();
    setRef(new Set());
  }

  return (
      <Row>
        <StyledForm onSubmit={onSubmit}>
          <div>
            <label htmlFor="todo">할 일: </label>
            <StyledTodoInput id="todo" value={todo} onChange={onChangeTodo} required minLength={2} maxLength={10}/>
            {todoErrMsg}
          </div>
          <div>
            <label htmlFor="todo-ref">먼저 해야할 일: </label>
            <StyledRefSelect id="todo-ref" onChange={onChangeSelect}>
              <option selected disabled hidden>선택해주세요</option>
              {todos.map(todo => {
                return (
                    <option key={todo.id + '_' + todo.todo} value={todo.id}>{todo.id + ": " + todo.todo}</option>
                )
              })}
            </StyledRefSelect>
          </div>
          {[...ref].map(refId => {
            return (
                <div key={refId}>@{refId}</div>
            )
          })}
          <Button type="primary" htmlType="submit"> {editingTodo.todo ? '수정' : '등록'}</Button>
          {editingTodo.todo && (<Button onClick={onCancelEditing}>취소</Button>)}
        </StyledForm>
      </Row>
  )
}

export default TodoForm;
