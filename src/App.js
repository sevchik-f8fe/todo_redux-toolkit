import { useState } from "react";
import { Box } from "@mui/material";

import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import TodoFilter from "./components/TodoFilter";
import { useDispatch } from "react-redux";
import { addTodo } from "./store/todoSlice";

function App() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const addTask = () => {
    if (value.trim().length > 0) {
      dispatch(addTodo({ value }));

      setValue('');
    }
  };

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
      <TodoList />
    </Box>
  );
}

export default App;
