import { Box, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { postQueryFn } from "../query/postQueryFn";
import { COUNT_PROCESS } from "../constants/url";
import * as echarts from "echarts";
const tmpdata = [
  {
    num: 199,
    name: "直特",
  },
  {
    num: 399,
    name: "动车",
  },
  {
    num: 159,
    name: "特快",
  },
  {
    num: 203,
    name: "快速",
  },
  {
    num: 201,
    name: "高速",
  },
];

export default function CountTrainClass() {
  const pieRef = React.useRef(null);

  useEffect(() => {
    // if (isSuccess) {
    const myChart = echarts.init(pieRef.current, "dark");
    myChart.setOption({
      backgroundColor: "",
      title: {
        text: "火车类型分布",
      },
      tooltip: {},
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          // data: data.data.map((item) => {
          //   return {
          //     value: item.frequency,
          //     name: item.name,
          //   };
          // }),
          data: tmpdata.map((item) => {
            return {
              value: item.num,
              name: item.name,
            };
          }),
        },
      ],
    });
    return () => {
      myChart.dispose();
    };
    // }
  }, []);
  return (
    <Paper
      sx={{
        width: "30%",
        maxWidth: "700px",
        minWidth: "400px",
        height: "450px",
        margin: 1,
        padding: 2,
        paddingRight: 0,
      }}
      elevation={3}
    >
      <Box ref={pieRef} sx={{ height: "450px" }}></Box>
    </Paper>
  );
}
