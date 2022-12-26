import React from "react";
import { Box, Drawer } from "@mui/material";

import { PatientsList } from "./patientsList";

interface PatientsBoxPropType {
  drawerWidth: number;
  patients: string[];
  isOpen: boolean;
  handleDrawerToggle: () => void;
  search: string;
  setSearch: (value: string) => void;
  handlePatientClick: (value: string) => void;
}

export const PatientsBox: React.FC<PatientsBoxPropType> = ({
  drawerWidth,
  patients,
  isOpen,
  handleDrawerToggle,
  search,
  setSearch,
  handlePatientClick,
}) => {
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="patient list"
    >
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <PatientsList
          search={search}
          setSearch={setSearch}
          patients={patients}
          handlePatientClick={handlePatientClick}
        />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <PatientsList
          search={search}
          setSearch={setSearch}
          patients={patients}
          handlePatientClick={handlePatientClick}
        />
      </Drawer>
    </Box>
  );
};
