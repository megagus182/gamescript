import { useState } from "react";
import SelectGenere from "./SelectGenere";
import SelectPrice from "./SelectPrice";
import SelectRating from "./SelectRating";
import SelectType from "./SelectType";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/reducers/videoGame";
import { useEffect } from "react";
import { getGames } from "../../redux/actions/videoGame";
import { Box, Button, Paper, Typography , Menu, MenuItem } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import "./filter.css";
import DisableElevation from "./CleanButton";

export default function Filter() {
  const { filters } = useSelector((state) => state.videogames);
  const { page } = useSelector((state) => state.videogames);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { name, rating, price, genre, sort } = filters;

  useEffect(() => {
    const filter = {
      name: name || "",
      rating: rating || "",
      price: price || "",
      genre: genre || "",
    };
    dispatch(setLoading());
    dispatch(getGames(filter, sort, page));
    const parseFilter = JSON.stringify({ ...filter, sort });
    const parsePage = JSON.stringify(page);
    window.sessionStorage.setItem("filters", parseFilter);
    window.sessionStorage.setItem("page", parsePage);
  }, [page, sort, name, rating, price, genre, dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button

        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
				sx={{display: {xs: 'content', md: 'none'}}}
      >
        Filter
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
				<MenuItem sx={{ marginLeft: "45px" }}>
              <SelectRating />
            </MenuItem>
            <MenuItem>
              <SelectPrice />
            </MenuItem>
            <MenuItem sx={{ marginLeft: "22px" }}>
              <SelectType />
            </MenuItem>
            <MenuItem sx={{ marginLeft: "22px" }}>
              <SelectGenere />
            </MenuItem>
            <MenuItem sx={{ marginLeft: "70px" }}>
              <DisableElevation />
            </MenuItem>
			</Menu>
      <Box
  className="Filters"
  sx={{
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    alignItems: "center",
    width: "300px",
    p: 2,
    position: "sticky",
    top: "90px",
    height: "fit-content",
  }}
>
  <Paper
    elevation={3}
    sx={{
      width: "100%",
      p: 3,
      borderRadius: 3,
      bgcolor: "background.paper",
    }}
  >
<Typography
  variant="h6"
  align="center"
  gutterBottom
  color="text.primary"
  sx={{ fontWeight: 'bold' }}
>
  FILTERS
</Typography>


    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <SelectRating />
      <SelectPrice />
      <SelectType />
      <SelectGenere />
      <DisableElevation />
    </Box>
  </Paper>
</Box>
    </>
  );
}
