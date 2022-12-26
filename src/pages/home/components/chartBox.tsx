import React, { useMemo } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

import { PatientScore } from "src/types/patient";

interface ChartBoxPropType {
  drawerWidth: number;
  patientData: PatientScore[] | undefined;
}

export const ChartBox: React.FC<ChartBoxPropType> = ({
  drawerWidth,
  patientData,
}) => {
  const name = useMemo(
    () =>
      patientData
        ? `${patientData[0]["Patient Name"]}'s Health Score`
        : "Please select a Patient",
    [patientData]
  );

  const data = useMemo(
    () => [
      {
        id: "GAD-7 Score",
        color: "hsl(270, 70%, 50%)",
        data:
          patientData?.map((item) => ({
            // x: Date.parse(item.Timestamp),
            x: item.Timestamp,
            y: item["GAD-7 Score"],
          })) || [],
      },
      {
        id: "PHQ-9 Score",
        color: "hsl(31, 70%, 50%)",
        data:
          patientData?.map((item) => ({
            // x: Date.parse(item.Timestamp),
            x: item.Timestamp,
            y: item["PHQ-9 Score"],
          })) || [],
      },
    ],
    [patientData]
  );

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      <Typography
        variant="h2"
        noWrap
        component="div"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {name}
      </Typography>
      {patientData && (
        <Box sx={{ height: "calc(100vh - 200px)" }}>
          <ResponsiveLine
            data={data}
            margin={{ top: 30, right: 110, bottom: 70, left: 60 }}
            xScale={{
              type: "time",
              format: "%m/%d/%Y %H:%M:%S",
            }}
            yScale={{
              type: "linear",
              min: 0,
              max: 27,
            }}
            curve="monotoneX"
            xFormat="time:%Y/%m/%d %H:%M:%S"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: "%Y/%m/%d",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 30,
              legend: "Time",
              legendOffset: 50,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Score",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor="white"
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      )}
    </Box>
  );
};
