import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { orderAlphabetically } from "../../redux/reducers/videoGame";

export default function SelectType() {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.videogames.filters);

  const handleType = (event) => {
    dispatch(orderAlphabetically(event.target.value));
  };

  return (
    <FormControl
      size="small"
      sx={{
        m: 1,
        minWidth: 140,
        bgcolor: "background.paper", 
        borderRadius: 1,
        "& .MuiInputLabel-root": {
          color: "text.primary",      
          fontWeight: "medium",
        },
        "& .MuiSelect-select": {
          color: "text.primary",      
          fontWeight: "medium",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "secondary.main", 
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "secondary.dark",  
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "primary.main",     
        },
      }}
    >
      <InputLabel id="select-type-label">Order</InputLabel>
      <Select
        labelId="select-type-label"
        value={sort}
        onChange={handleType}
        label="Ordenar"
      >
        <MenuItem value="">
          <em>Ninguno</em>
        </MenuItem>
        <MenuItem value="asc">A/Z</MenuItem>
        <MenuItem value="desc">Z/A</MenuItem>
      </Select>
    </FormControl>
  );
}
