import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { filterByGenre } from '../../redux/reducers/videoGame';
import config from "../../config";

export default function SelectGenere() {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const { genre } = useSelector(state => state.videogames.filters);

  useEffect(() => {
    axios.get(`${config.BACKEND_URL}/genres`)
      .then(response => setOptions(response.data))
      .catch(error => console.error("Error loading genres:", error));
  }, []);

  const handleGenere = (event) => {
    dispatch(filterByGenre(event.target.value));
  };

  return (
    <FormControl
      size="small"
      sx={{
        m: 1,
        minWidth: 140,
        bgcolor: 'background.paper',
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
      <InputLabel id="select-genre-label">Genre</InputLabel>
      <Select
        labelId="select-genre-label"
        value={genre}
        onChange={handleGenere}
        label="Genre"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((el) => (
          <MenuItem key={el.id} value={el.name}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
