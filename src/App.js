import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import TodoFilter from "./components/TodoFilter";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, fetchTodos } from "./store/todoSlice";

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.todos);
  const [value, setValue] = useState('');

  const addTask = () => {
    if (value.trim().length > 0) {
      dispatch(createTodo({ title: value }));

      setValue('');
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <Box sx={{
      maxWidth: 1200,
      mx: 'auto',
      bgcolor: '#55555507',
      p: .5,
      mt: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      alignItems: 'center',
    }}>
      <TodoFilter />
      <TodoInput value={value} setValue={setValue} addTodo={addTask} />

      {status === 'LOADING' ? (
        <h2>loading</h2>
      ) : (error ? (
        <h2>error: {error}</h2>
      ) : (
        <TodoList />
      ))}
    </Box>
  );
}

export default App;
