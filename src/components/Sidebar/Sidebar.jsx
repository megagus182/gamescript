import * as React from "react";
import { useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import PercentIcon from "@mui/icons-material/Percent";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import Switch from "@mui/material/Switch";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import { useContext } from "react";
import { ColorModeContext } from "../Theme/Theme";
import "./Sidebar.css";

const drawerWidth = 240;


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar = () => {
  const theme = useTheme();
  const { status } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const { mode, toggleMode } = useContext(ColorModeContext);
  // const contact = useRef()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant='temporary'
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {Boolean(status !== "guest") && (
              <>
                <ListItem>
                  <Link
                    component={RouterLink}
                    to={"/account/purchases"}
                    underline="none"
                    sx={{
                      color: (mode === "dark") ? "white"  : "black" ,
                    }}
                    className="navlink"
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <VideogameAssetIcon />
                      </ListItemIcon>
                      <ListItemText primary={"My collection"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    component={RouterLink}
                    to={"/wishes"}
                    underline="none"
                    sx={
                      mode === "dark" ? { color: "white" } : { color: "black" }
                    }
                    className="navlink"
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Wish List"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            )}
            <ListItem>
              <Link
                component={RouterLink}
                to={"/discounts"}
                underline="none"
                sx={mode === "dark" ? { color: "white" } : { color: "black" }}
                className="navlink"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <PercentIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Discounts"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                component={RouterLink}
                to={"/about"}
                underline="none"
                sx={mode === "dark" ? { color: "white" } : { color: "black" }}
                className="navlink"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <QuestionMarkIcon />
                  </ListItemIcon>
                  <ListItemText primary={"About"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                component={RouterLink}
                to={"/contact"}
                underline="none"
                sx={mode === "dark" ? { color: "white" } : { color: "black" }}
                offset={50}
                duration={500}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <QuestionAnswerIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Contact us"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Switch
                checked={mode === "dark"}
                onChange={toggleMode}
                color={"secondary"}
              />
              <ListItemIcon>
                <Brightness5Icon />
              </ListItemIcon>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
    </>
  );
};

export default Sidebar;
