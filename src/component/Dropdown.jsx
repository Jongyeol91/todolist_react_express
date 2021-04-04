import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const Dropdown = () => {
  const todos = useSelector(state => state.todos.todos)
  const makeSelectTag = useMemo(() => {
    const options = [];
    for (let i = 0; i <= todos.length; i++) {
      options.push(<option key={`key_${i}`} value={todos.id}>{todos.id}</option>)
    }
    return options;
  }, [todos])

  const onChangeSelect = (e) => {
    console.log(e.target.value);
  }

  return (
      <>
        <select name="arrivalTime" id="arrivalTime" onChange={onChangeSelect}>
          <option key={`key_start`} hidden>{1}</option>
          {makeSelectTag}
        </select>
      </>
  )
}

export default Dropdown;