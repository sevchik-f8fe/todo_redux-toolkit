import { useSelector } from "react-redux";
import { List } from "@mui/material";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const todos = useSelector(state => state.todos.showTodos);

    return (
        <List>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </List>
    );
}

export default TodoList;