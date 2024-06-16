import { Button, Box, TextField } from "@mui/material";

const TodoInput = ({ value, setValue, addTodo }) => {
    return (
        <Box sx={{
            mt: 4,
            ml: 4,
        }}>
            <TextField label="Add task" variant="standard" value={value} onChange={(e) => setValue(e.target.value)} />
            <Button onClick={addTodo} variant="outlined" size="small" sx={{
                minWidth: 25,
                padding: 0,
                lineHeight: 1.2,
                fontSize: 20,
            }}>+</Button>
        </Box>
    );
}

export default TodoInput;