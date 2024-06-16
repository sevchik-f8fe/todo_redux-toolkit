import { FormControl, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterTodos } from "../store/todoSlice";

const TodoFilter = () => {
    const dispatch = useDispatch();

    return (
        <FormControl sx={{ mb: 5, minWidth: 200 }}>
            <Select
                defaultValue='SHOW_ALL'
                onChange={(e) => {
                    dispatch(filterTodos({ type: e.target.value }))
                }}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value='SHOW_ALL'>
                    <em>Show All</em>
                </MenuItem>
                <MenuItem value='SHOW_UNCOMPLETED'>Show Uncompleted</MenuItem>
                <MenuItem value='SHOW_COMPLETED'>Show Completed</MenuItem>
            </Select>
        </FormControl>
    );
}

export default TodoFilter;