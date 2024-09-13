import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(false);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (user) {
      navigate("/profile");
      setAuth(true);
    } else {
      navigate("/auth/login");
    }
    setAnchorEl(null);
  };
  useEffect(() => {
    if (user) {
      setAuth(true);
    }
  }, [user]);
  return (
    <Box sx={{ flexGrow: 1, marginTop: "80px" }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* Left Side: Menu and Navbar Items */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Button component={Link} to="/" color="inherit">
            Dashboard
          </Button>
          {auth && (
            <>
              {" "}
              <Button component={Link} to="/batch" color="inherit">
                Batch
              </Button>
              <Button component={Link} to="/notes" color="inherit">
                Notes
              </Button>
              <Button component={Link} to="/test" color="inherit">
                Test
              </Button>
              <Button component={Link} to="/source-code" color="inherit">
                Source Code
              </Button>
              <Button component={Link} to="/assignments" color="inherit">
                Assignment
              </Button>
              <Button component={Link} to="/technology" color="inherit">
                Technology
              </Button>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {user ? (
            <Button component={Link} to="/profile" color="inherit">
              {user.name}
            </Button>
          ) : (
            <>
              {" "}
              <Button component={Link} to="/auth/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/auth/register" color="inherit">
                Sign Up
              </Button>
            </>
          )}

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {user && (
              <>
                {" "}
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                    navigate("/auth/login");
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                >
                  Log out
                </MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
