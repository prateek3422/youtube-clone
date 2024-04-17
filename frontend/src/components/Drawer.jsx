import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Header from "./Headers/Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdHome } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// eslint-disable-next-line react/prop-types
export default function MiniDrawer({children}) {
  const authStatus = useSelector((state) => state.auth.status);
  
  const [open, setOpen] = React.useState(false);




  const sideList = [
    {
      name: "Home",
      icon: <IoMdHome className="text-white" fontSize={"1.5rem"} />,
      slug: "/",
      active: authStatus,
    },

    {
      name: "Liked videos",
      icon: <AiFillLike className="text-white" fontSize={"1.5rem"} />,
      slug: "/liked-videos",
      active: authStatus,
    },
    {
      name: "History",
      icon: <FaHistory className="text-white" fontSize={"1.5rem"} />,
      slug: "/history",
      active: authStatus,
    },

    // {
    //   name: "Collection",
    //   icon: <BsCollectionPlay className="text-white" />,
    //   slug: "/collection",
    //   active: authStatus,
    // },

    {
      name: "MyContent",
      icon: <FaVideo className="text-white" fontSize={"1.5rem"} />,
      slug: "/content",
      active: authStatus,
    },
    {
      name: "Subscribers",
      icon: <FaUserCheck className="text-white" fontSize={"1.5rem"} />,
      slug: "/subscribers",
      active: authStatus,
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "#282828", boxShadow: "none" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <Header />
        </Toolbar>
      </AppBar>

      <div></div>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: { backgroundColor: "#282828", boxShadow: "none", pt: 3 },
        }}
      >
        <DrawerHeader>
      
         
        </DrawerHeader>
        <Divider />
        <List>
          {sideList.map((text,) =>
            text.active ? (
              <Link to={text.slug} key={text.name}>
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {/* {index % 2 === 0 ? text.icon: <MailIcon />} */}

                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text.name}
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : null
          )}
        </List>
        <Divider />
      
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* <DrawerHeader /> */}
        {children}
      </Box>
    </Box>
  );
}
