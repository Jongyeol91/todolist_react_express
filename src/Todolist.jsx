import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Todo from "./component/Todo";
import Form from './component/Form'
import Pagination from "./component/pagination";
import Search from "./component/Search";
import { getTodos, createTodo, deleteTodo, completeTodo } from "./reducers/todolist";

const Todolist = () => {
  // todolist redux에서 불러오기
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  // 검색 state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');

  // 페이지네이션 state
  const [perPageTodos] = useState(5); // 페이지당 투두리스트 수
  const [perPageNum] = useState(5); // 페이지당 페이지네이션 숫자
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [maxPageNum, setMaxPageNum] = useState(5); // 마지막 페이지 번호
  const [minPageNum, setMinPageNum] = useState(0); // 처음 페이지 번호

  // 천 진입시 투두리스트 불러오기
  useEffect(() => {
    dispatch(getTodos());
  }, []);

  // 페이지네이션 로직
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const lastTodoIdx = currentPage * perPageTodos; // 마지막 투두 인덱스 = 현재 페이지 * 페이지당 투두 수
  const firstTodoIdx = lastTodoIdx - perPageTodos  // 첫번째 투두 인덱스  = 마지막 투두 인덱스 - 페이지당 투두 수
  const currentTodos = !searchTerm && !searchEndDate ? todos.slice(firstTodoIdx, lastTodoIdx) : todos; // 현재 노출 투두들 (검색시에는 페이지네이션 적용 x)

  const pages = [];
  for (let i = 1; i <= Math.ceil(todos.length / perPageTodos); i++) {
    pages.push(i);
  }

  // Create new todo
  const handleTodoCreate = useCallback(async (todo, ref) => {
    const data = {todo, ref}
    console.log('data', data)
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
    if (ref && completed == 1) {
      let refArr = ref.split(',').map(el => parseInt(el, 10));
      if (todos.find(todo => refArr.includes(todo.id) && !todo.completed)) {
        alert('참조하는 todo를 먼저 완료해야 완료할 수 있습니다.');
        return
      }
    }

    await dispatch(completeTodo({id, completed}));
    dispatch(getTodos());
  },[todos]);

  // 페이지네이션 '다음' 버튼
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

  // 페이지네이션 '이전' 버튼
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
        <Form handleTodoCreate={handleTodoCreate}/>
        <Search setSearchTerm={setSearchTerm}
                setSearchStartDate={setSearchStartDate}
                setSearchEndDate={setSearchEndDate}
        />
        {/* 검색 로직 */}
        {currentTodos.length > 0 && currentTodos.filter(todo => {
          return (!searchTerm ? todo : todo.todo.toLowerCase().includes(searchTerm.toLowerCase()))
        }).filter(todo => {
          let compareDate = moment(todo.createdAt).format('YYYY-MM-DD');
          return (!searchStartDate ? todo : moment(compareDate).isBetween(searchStartDate, searchEndDate, undefined, '[]')
          )
        }).map((todo) => (
            <>
              <Todo key={todo.id}
                    todo={todo}
                    handleTodoCompletion={handleTodoCompletion}
                    handleTodoDelete={handleTodoDelete}
              />
            </>
        ))}
        {/* 검색시에는 페이지네이션 안보이게 처리 */}
        {(!searchTerm && !searchEndDate) &&
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
        }
      </>
  )
}

export default Todolist;
