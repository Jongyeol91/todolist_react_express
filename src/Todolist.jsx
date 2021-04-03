import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Todo from "./component/Todo";
import Form from './component/Form'
import Pagination from "./component/pagination";
import Search from "./component/Search";
import { getTodos, createTodo, deleteTodo, completeTodo } from "./reducers/todolist";

const Todolist = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [perPageTodos] = useState(4); // 페이지당 투두리스트 수
  const [perPageNum] = useState(5); // 페이지당 페이지네이션 숫자
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [maxPageNum, setMaxPageNum] = useState(5); // 마지막 페이지 번호
  const [minPageNum, setMinPageNum] = useState(0); // 처음 페이지 번호

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const lastTodoIdx = currentPage * perPageTodos; // 마지막 투두 인덱스 = 현재 페이지 * 페이지당 투두 수
  const firstTodoIdx = lastTodoIdx - perPageTodos  // 첫번째 투두 인덱스  = 마지막 투두 인덱스 - 페이지당 투두 수
  const currentTodos = !searchTerm ? todos.slice(firstTodoIdx, lastTodoIdx) : todos; // 현재 노출 투두들 (검색시에는 페이지네이션 적용 x)
  // 페이지네이션

  const pages = [];
  for (let i = 1; i <= Math.ceil(todos.length / perPageTodos); i++) {
    pages.push(i);
  }

  // Create new todo
  const handleTodoCreate = useCallback(async (todo, ref, completed) => {
    const data = {todo, ref, completed}
    await dispatch(createTodo(data));
    dispatch(getTodos());
  }, [todos]);

  // Remove todo
  const handleTodoDelete = useCallback(async (id, todo) => {
    // Send PUT request to 'todolist/delete' endpoint
    await dispatch(deleteTodo({id}));
    dispatch(getTodos());
  }, [todos]);

  // update todo
  const handleTodoCompletion = useCallback(async (id, ref, completed) => {
    if (ref) {
      let refArr = ref.split().map(el => parseInt(el, 10));
      if (todos.find(todo => refArr.includes(todo.id) && !todo.completed)) {
        alert('참조하는 todo를 먼저 완료해야 완료할 수 있습니다.');
        return
      }
    }

    await dispatch(completeTodo({id, completed}));
    dispatch(getTodos());
  },[todos]);

  const handleNext = () => {
    if (currentPage < Math.ceil(todos.length / perPageTodos)) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPageNum) { // 현재 페이지가 현재 페이지 네이션 오른쪽 끝 번호일 경우
        setMaxPageNum(maxPageNum + perPageNum);
        setMinPageNum(minPageNum + perPageNum);
      }
    } else {
      alert('마지막 페이지입니다.');
    }
  };

  const handlePrevious = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % perPageNum === 0) {
        setMaxPageNum(maxPageNum - perPageNum);
        setMinPageNum(minPageNum - perPageNum);
      }
    } else {
      alert('처음 페이지입니다.');
    }
  };

  return (
      <>
        <Form
          handleTodoCreate={handleTodoCreate}
        />
        <Search setSearchTerm={setSearchTerm} />
        {currentTodos.length > 0 && currentTodos.filter(todo => {
          return (
              !searchTerm
              ? todo
              : todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }).map((todo, i) => (
            <>
              <Todo key={todo.id}
                    todo={todo}
                    handleTodoCompletion={handleTodoCompletion}
                    handleTodoDelete={handleTodoDelete}
              />
            </>
        ))}
        <Pagination
            totalTodos={todos.length}
            perPageTodos={perPageTodos}
            minPageNum={minPageNum}
            maxPageNum={maxPageNum}
            currentPage={currentPage}
            paginate={paginate}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
        />
      </>
  )
}

export default Todolist;
