import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  ADD_TODO_TYPE,
  REMOVE_TODO_TYPE,
  TOGGLE_CHANGE_TYPE,
  StateContext,
} from "../App";

export const TodoForm = () => {
  const { todoState, todoDispatch } = useContext(StateContext);
  const [newTodo, setNewTodo] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      todoDispatch({ type: ADD_TODO_TYPE, payload: newTodo });
      setNewTodo("");
    }
  };
  const handleRemoveTodo = (index) => {
    todoDispatch({ type: REMOVE_TODO_TYPE, payload: index });
  };
  const toggleDoneHandler = (index) => {
    todoDispatch({ type: TOGGLE_CHANGE_TYPE, payload: index });
  };

  const filteredTodos = () => {
    switch (selectedOption) {
      case "all":
        return todoState;
      case "completed":
        return todoState.filter((todoItem) => todoItem.change);
      case "uncompleted":
        return todoState.filter((todoItem) => !todoItem.change);
      default:
        return todoState;
    }
  };
  return (
    <Todos>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>

      {filteredTodos().map((todoItem, index) => (
        <TodoMap key={index}>
          <p
            style={{
              textDecoration: todoItem.change ? "line-through" : "none",
            }}
          >
            {todoItem.text}
          </p>
          <button onClick={() => toggleDoneHandler(index)}>
            {todoItem.change ? "Uncomplete" : "Complete"}
          </button>
          <button onClick={() => handleRemoveTodo(index)}>Delete</button>
        </TodoMap>
      ))}
    </Todos>
  );
};
const Todos = styled.div`
    padding: 30px;

    /* input{
        width: 100px;
        height: 30px;
        border-radius: 16px;
    } */
`
const TodoMap = styled.div`
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-around;

   
`