import React, { useState, useMemo } from "react";
import { Box, CssBaseline } from "@mui/material";

import { Appbar } from "./components/appbar";
import { PatientsBox } from "./components/patientsBox";
import { ChartBox } from "./components/chartBox";
import { PatientScore } from "src/types/patient";

import mockData from "src/assets/json/patients.json";

const drawerWidth = 300;

export const Home: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const data: PatientScore[] = mockData;
  const [selected, setSelected] = useState<PatientScore[] | undefined>(
    undefined
  );

  const groupData = useMemo(() => {
    const map = new Map<string, PatientScore[]>();
    data.forEach((item) => {
      map.set(item["Patient Name"], [
        ...(map.get(item["Patient Name"]) || []),
        item,
      ]);
    });
    return Object.fromEntries(map);
  }, [data]);

  const users = useMemo(
    () =>
      Object.keys(groupData)
        .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
        .sort((prev, next) =>
          prev.toLowerCase() < next.toLowerCase() ? -1 : 1
        ),
    [groupData, search]
  );

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handlePatientClick = (patient: string) => {
    setSelected(groupData[patient]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <PatientsBox
        drawerWidth={drawerWidth}
        patients={users}
        isOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        search={search}
        setSearch={setSearch}
        handlePatientClick={handlePatientClick}
      />
      <ChartBox drawerWidth={drawerWidth} patientData={selected} />
    </Box>
  );
};
