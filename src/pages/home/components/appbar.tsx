import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

interface AppbarPropType {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

export const Appbar: React.FC<AppbarPropType> = ({
  drawerWidth,
  handleDrawerToggle,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h1"
          noWrap
          component="div"
          sx={{ fontSize: "24px", fontWeight: "bold" }}
        >
          Mental Health Score Visualizer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
