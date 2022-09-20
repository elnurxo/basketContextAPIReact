import React,{useContext} from "react";
import { basketContext } from "../context/basketItems";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        To Do APP
      </Typography>
      <Divider />
      <List>
        <Link to="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="todos">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"View ToDos"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/addtodo">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Add To Do"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/completedtodos">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Completed ToDos"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const { basketItems } = useContext(basketContext);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        sx={{
          justifyContent: "center",
          background:
            "linear-gradient(90deg, rgba(36,0,0,1) 0%, rgba(121,27,9,1) 35%, rgba(130,106,61,1) 67%, rgba(255,0,0,1) 98%)",
          height: "80px",
        }}
        component="nav"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
          >
            Context API/Basket
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/">
              <Button className="link" sx={{ color: "#fff" }}>
                Home
              </Button>
            </Link>
            <Link to="basket">
              <Button className="link" sx={{ color: "#fff" }}>
                Basket <sub style={{marginLeft:'5px',fontWeight:'bold',color:'black'}}>{basketItems ? basketItems.length : 0}</sub>
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
