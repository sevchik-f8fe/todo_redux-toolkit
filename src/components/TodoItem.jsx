import { useDispatch } from "react-redux";
import { Checkbox, ListItem, ListItemText, FormControlLabel, Button } from "@mui/material";
import { removeTodo, toggleTodo } from "../store/todoSlice";

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();

    return (
        <ListItem sx={{
            border: 3,
            minWidth: '15rem',
            maxWidth: 'fit-content',
            borderRadius: '.5em',
            borderColor: '#55555521',
            py: .1,
            mb: 1,
            display: 'flex',
            justifyContent: "space-between",
        }}>
            <FormControlLabel
                value="top"
                control={<Checkbox onChange={() => dispatch(toggleTodo({ id: todo.id }))} checked={todo.completed} />}
                label={<ListItemText
                    primary={todo.value}
                    secondary={new Date(todo.id).toLocaleDateString()}
                />}
                labelPlacement="end"
            />
            <Button onClick={() => dispatch(removeTodo({ id: todo.id }))} variant="outlined" color="error" size="small" sx={{
                minWidth: 25,
                padding: 0,
                lineHeight: 1.2,
                fontSize: 20,
            }}>
                &times;
            </Button>
        </ListItem>
    );
}

export default TodoItem;