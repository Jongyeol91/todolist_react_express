import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Todo from "./Todo";
import Form from './Form'

const todolist = [{
  id: '1',
  ref: [],
  task: '투두리스트 만들기',
  completed: false,
  created_at: '2021-03-13',
  updated_at: '2021-03-14',
}, {
  id: '2',
  ref: [],
  task: '사탕사기',
  completed: false,
  created_at: '2021-03-14',
  updated_at: '2021-03-14',
},
];

const Todolist = () => {
  const [todos, setTodos] = useState(todolist);

  // Fetch all books on initial render
  useEffect(() => {
    fetchTodolist()
  }, [])

  // Fetch all books
  const fetchTodolist = async () => {
    // Send GET request to 'books/all' endpoint
    axios
      .get('http://localhost:4001/todolist/all')
      .then(response => {
        // Update the books state
        console.log(response.data)
        setTodos(response.data)

        // Update loading state
        //setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the book list: ${error}`))
  }

  // Create new book
  const handleTodoCreate = (ref, task, completed) => {
    // Send POST request to 'books/create' endpoint
    axios
      .post('http://localhost:4001/books/create', {
        ref: ref,
        task: task,
        completed: completed,
      })
      .then(res => {
        console.log(res.data)
        // Fetch all books to refresh
        // the books on the bookshelf list
        fetchTodolist()
      })
      .catch(error => console.error(`There was an error creating the ${todolist} book: ${error}`))
  }

  const toggleCompletion = (id, ref) => {
    if (todos.find(todo => ref.includes(todo.id) && todo.completed === false)) {
      alert('참조하는 task를 먼저 완료해야 완료할 수 있습니다.');
      return
    }

    let updatedTodoList = todos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed};
      }
      return todo;
    })
    setTodos(updatedTodoList);
  }

  const addTask = (userInput) => {
    let copy = [...todos];
    copy = [...copy, { id: todos.length + 1, task: userInput.task, ref: userInput.ref.split(','), completed: false }];
    setTodos(copy);
  }

  const removeTask = (id, ref) => {
    setTodos(todos.filter( todo => todo.id !== id))
  }

  return (
      <>
        <Form addTask={addTask} handleBookCreate={handleTodoCreate}/>
        {todos.map((todo, i) => (
            <>
              <Todo key={todo.id} todo={todo} toggleCompletion={toggleCompletion} removeTask={removeTask} />
              { i < todos.length -1  && <hr/>}
            </>
        ))}
      </>
  )
}

export default Todolist;
