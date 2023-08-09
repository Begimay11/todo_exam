import React, { createContext, useReducer } from "react";
import { TodoForm } from "./components/TodoForm";
export const StateContext = createContext();

const initialState = [];
export const ADD_TODO_TYPE = "ADD_TODO";
export const REMOVE_TODO_TYPE = "REMOVE_TODO";
export const TOGGLE_CHANGE_TYPE = "TOGGLE_CHANGE";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO_TYPE:
      return [...state, { text: action.payload, change: false }];
    case REMOVE_TODO_TYPE:
      return state.filter((item, index) => index !== action.payload);
    case TOGGLE_CHANGE_TYPE:
      return state.map((item, index) =>
        index === action.payload ? { ...item, change: !item.change } : item
      );
    default:
      return state;
  }
};
function App() {
  const [todo, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <StateContext.Provider
        value={{ todoState: todo, todoDispatch: dispatch }}
      >
        <TodoForm />
      </StateContext.Provider>
    </div>
  );
}
export default App;