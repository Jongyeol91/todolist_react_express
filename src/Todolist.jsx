import React from 'react';
import Todo from "./Todo";

const todos = [{
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
  return (
      <>
        {todos.map((todo, i) => (
            <>
              <Todo key={todo.id} todo={todo} />
              { i < todos.length -1  && <hr/>}
            </>
        ))}
      </>
  )
}

export default Todolist;
