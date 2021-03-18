import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Todo from "./Todo";
import Form from './Form'

const Todolist = () => {
  const [todos, setTodos] = useState([]);

  // Fetch all todolist on initial render
  useEffect(() => {
    fetchTodolist()
  }, [])

  // Fetch all todo
  const fetchTodolist = async () => {
    // Send GET request to 'todolist/all' endpoint
    try {
      const response = await axios.get('http://localhost:4001/todolist/all');
      if (response) {
        console.log(response.data)
        setTodos(response.data)
      }
    } catch (error) {
      console.error(`There was an error retrieving the todolist: ${error}`)
    }
  }

  // Create new todo
  const handleTodoCreate = async (ref, task, completed) => {
    // Send POST request to 'todolist/create' endpoint
    try {
      const response = await axios.post('http://localhost:4001/todolist/create', {
        ref: ref,
        task: task,
        completed: completed,
      });
      if (response) {
        console.log(response.data)
        fetchTodolist();
      }
    } catch (error) {
      console.error(`There was an error creating the ${todos} book: ${error}`)
    }
  }

  // Remove todo
  const handleTodoDelete = async (id, task) => {
    // Send PUT request to 'todolist/delete' endpoint
    try {
      const response = await axios.put('http://localhost:4001/todolist/delete', { id: id });
      if (response) {
        console.log(`todolist ${task} removed.`)
        fetchTodolist()
      }
    } catch (error) {
      console.error(`There was an error removing the ${task} todolist: ${error}`)
    }
  }

  // update todo
  const toggleCompletion = async (id, ref, completed) => {
    console.log(ref, completed)
    if (ref) {
      let refArr = ref.split('').map(el => parseInt(el, 10));
      console.log(refArr);
      console.log(completed);

      if (todos.find(todo => refArr.includes(todo.id) && !todo.completed)) {
        alert('참조하는 task를 먼저 완료해야 완료할 수 있습니다.');
        return
      }
    }

    try {
      const response = await axios.put('http://localhost:4001/todolist/update', { id: id, completed: completed ? 1 : 0 });
      if (response) {
        console.log(`todolist ${id} updated.`)
        fetchTodolist()
      }
    } catch (error) {
      console.error(`There was an error removing the ${id} todolist: ${error}`)
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
    copy = [...copy, { id: todos.length + 1, task: userInput.task, ref: userInput.ref && userInput.ref.split(','), completed: false }];
    setTodos(copy);
  }

  return (
      <>
        <Form addTask={addTask} handleTodoCreate={handleTodoCreate}/>
        {todos.length > 0 && todos.map((todo, i) => (
            <>
              <Todo key={todo.id}
                    todo={todo}
                    toggleCompletion={toggleCompletion}
                    handleTodoDelete={handleTodoDelete}
              />
              { i < todos.length -1  && <hr/>}
            </>
        ))}
      </>
  )
}

export default Todolist;
