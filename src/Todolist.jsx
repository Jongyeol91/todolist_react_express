import React, {useState, useEffect} from 'react';
import Todo from "./Todo";
import Form from './Form'

const todolist = [{
  id: 1,
  ref: null,
  task: '투두리스트 만들기',
  completed: false,
  created_at: '2021-03-13',
  updated_at: '2021-03-14',
}, {
  id: 2,
  ref: null,
  task: '사탕사기',
  completed: false,
  created_at: '2021-03-14',
  updated_at: '2021-03-14',
},
];

const Todolist = () => {
  const [todos, setTodos] = useState(todolist);

  const toggleCompletion = (id) => {
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
    copy = [...copy, { id: todos.length + 1, task: userInput, completed: false }];
    setTodos(copy);
  }

  return (
      <>
        <Form addTask={addTask}/>
        {todos.map((todo, i) => (
            <>
              <Todo key={todo.id} todo={todo} toggleCompletion={toggleCompletion} />
              { i < todos.length -1  && <hr/>}
            </>
        ))}
      </>
  )
}

export default Todolist;
