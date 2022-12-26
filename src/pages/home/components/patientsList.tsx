import React, { ChangeEvent } from "react";
import {
  Box,
  Toolbar,
  Divider,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

interface PatientsListPropType {
  search: string;
  setSearch: (value: string) => void;
  patients: string[];
  handlePatientClick: (value: string) => void;
}

export const PatientsList: React.FC<PatientsListPropType> = ({
  search,
  setSearch,
  patients,
  handlePatientClick,
}) => {
  return (
    <Box>
      <Toolbar sx={{ position: "sticky" }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Patients"
          inputProps={{ "aria-label": "search patients" }}
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <SearchIcon sx={{ color: "gray" }} />
      </Toolbar>
      <Divider />
      {patients.length ? (
        <List>
          {patients.map((patient) => (
            <ListItemButton
              key={patient}
              onClick={() => handlePatientClick(patient)}
            >
              <ListItemText primary={patient} />
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            marginTop: "10px",
            fontSize: "16px",
            fontStyle: "italic",
          }}
        >
          No patient
        </Typography>
      )}
    </Box>
  );
};
