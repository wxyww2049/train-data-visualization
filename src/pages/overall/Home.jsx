import { Box, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import CountTrainClass from "../../compents/CountTrainClass";
import { postQueryFn } from "../../query/postQueryFn";
import { useQuery } from "@tanstack/react-query";
import { FrePriceURL } from "../../constants/url";
import * as echarts from "echarts";
const SimpleInfo = (props) => (
  <Paper sx={{ width: "300px", maxWidth: "22%", height: "150px", padding: 3 }}>
    <Typography variant="h6">{props.preText}</Typography>
    <Typography variant="h3">{props.foucsText}</Typography>
    <Divider />
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
    >
      <Typography variant="h6">{props.linText}</Typography>
    </Box>
  </Paper>
);
const FrePrice = () => {
  const myref = useRef(null);
  const { isSuccess, isFetching, data } = useQuery({
    queryKey: [FrePriceURL],
    queryFn: postQueryFn,
  });
  useEffect(() => {
    if (isSuccess) {
      const myChart = echarts.init(myref.current, "dark");
      const option = {
        backgroundColor: "",
        title: {
          text: "全票价格分布",
        },

        xAxis: {
          name: "价格",
          data: data.data.data.map((item) => item.price),
        },
        yAxis: {
          name: "频数",
        },
        series: [
          {
            data: data.data.data.map((item) => item.fre),
            type: "line",
            smooth: true,
          },
        ],
      };
      myChart.setOption(option);
      return () => {
        myChart.dispose();
      };
    }
  }, [isSuccess]);
  return (
    <Paper
      sx={{
        width: "70%",
        // maxWidth: "700px",
        minWidth: "400px",
        height: "450px",
        padding: 5,
        margin: 1,
      }}
    >
      {isSuccess && (
        <Box sx={{ width: "100%", height: "450px " }} ref={myref}>
          freque
        </Box>
      )}
    </Paper>
  );
};
export default function Home() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <SimpleInfo preText="每日" foucsText="1161" linText="班列车" />
        <SimpleInfo preText="全国" foucsText="3272" linText="个车站" />
        <SimpleInfo preText="平均途经" foucsText="11" linText="站" />
        <SimpleInfo preText="共途经" foucsText="418" linText="座城市" />
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CountTrainClass />
        <FrePrice />
      </Box>
    </Box>
  );
}
