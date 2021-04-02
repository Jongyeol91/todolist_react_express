import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import Todo from "./component/Todo";
import Form from './component/Form'
import Pagination from "./component/pagination";
import Search from "./component/Search";
import { getTodos } from "./reducers/todolist";

const baseUri = 'http://localhost:4001/todolist';

const Todolist = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  // const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [perPageTodos] = useState(4); // 페이지당 투두리스트 수
  const [perPageNum] = useState(5); // 페이지당 페이지네이션 숫자
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [maxPageNum, setMaxPageNum] = useState(5); // 마지막 페이지 번호
  const [minPageNum, setMinPageNum] = useState(0); // 처음 페이지 번호

  useEffect(() => {
    dispatch(getTodos());
    //fetchTodolist()
  }, []);
  //
  // useEffect(() => {
  //
  // }, [todos])
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const lastTodoIdx = currentPage * perPageTodos; // 마지막 투두 인덱스 = 현재 페이지 * 페이지당 투두 수
  const firstTodoIdx = lastTodoIdx - perPageTodos  // 첫번째 투두 인덱스  = 마지막 투두 인덱스 - 페이지당 투두 수
  const currentTodos = !searchTerm ? todos.slice(firstTodoIdx, lastTodoIdx) : todos; // 현재 노출 투두들 (검색시에는 페이지네이션 적용 x)
  // 페이지네이션

  const pages = [];
  for (let i = 1; i <= Math.ceil(todos.length / perPageTodos); i++) {
    pages.push(i);
  }

  // Fetch all todolist on initial render


  // Fetch all todo
  const fetchTodolist = useCallback(async () => {
    // Send GET request to 'todolist/all' endpoint
    try {
      const response = await axios.get(baseUri);
      if (response) {
        console.log(response.data)
        //setTodos(response.data)
      }
    } catch (error) {
      console.error(`There was an error retrieving the todolist: ${error}`)
    }
  }, [todos]);

  // Create new todo
  const handleTodoCreate = useCallback(async (todo, ref, completed) => {
    // Send POST request to 'todolist/create' endpoint
    try {
      const response = await axios.post(baseUri, {
        todo: todo,
        ref: ref,
        completed: completed
      });
      if (response) {
        console.log(response.data)
        dispatch(getTodos());
      }
    } catch (error) {
      console.error(`There was an error creating the ${todos} todo: ${error}`)
    }
  }, [todos]);

  // Remove todo
  const handleTodoDelete = useCallback(async (id, todo) => {
    // Send PUT request to 'todolist/delete' endpoint
    try {
      const response = await axios.delete(`${baseUri}?id=${id}`);
      if (response) {
        console.log(`todolist ${todo} removed.`)
        dispatch(getTodos());
      }
    } catch (error) {
      console.error(`There was an error removing the ${todo} todolist: ${error}`)
    }
  },[todos]);

  // update todo
  const handleTodoCompletion = useCallback(async (id, ref, completed) => {
    if (ref) {
      let refArr = ref.split().map(el => parseInt(el, 10));

      if (todos.find(todo => refArr.includes(todo.id) && !todo.completed)) {
        alert('참조하는 todo를 먼저 완료해야 완료할 수 있습니다.');
        return
      }
    }

    try {
      const response = await axios.put(baseUri, { id: id, completed: completed ? 1 : 0 });
      if (response) {
        console.log(`todolist ${id} updated.`)
        dispatch(getTodos());
      }
    } catch (error) {
      console.error(`There was an error removing the ${id} todolist: ${error}`)
    }
  },[todos]);

  // const addTask = useCallback((userInput) => {
  //   let copy = [...todos];
  //   copy = [...copy, { id: todos.length + 1, task: userInput.task, ref: userInput.ref && userInput.ref.split(','), completed: false }];
  //   setTodos(copy);
  // },[todos]);

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
