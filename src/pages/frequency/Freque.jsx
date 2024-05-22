import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useQuery } from "@tanstack/react-query";
import { FreLen } from "../../constants/url";
import { postQueryFn } from "../../query/postQueryFn";

export default function Freque() {
  const myref = useRef(null);
  const { isSuccess, isFetching, data } = useQuery({
    queryKey: [FreLen],
    queryFn: postQueryFn,
  });
  useEffect(() => {
    if (isSuccess) {
      const myChart = echarts.init(myref.current, "dark");
      const option = {
        backgroundColor: "",
        title: {
          text: "线路长度分布",
        },

        xAxis: {
          name: "长度",
          data: data.data.data.map((item) => item.len),
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
    <Box>
      {isSuccess && (
        <Box sx={{ width: "100%", height: "700px" }} ref={myref}>
          freque
        </Box>
      )}
    </Box>
  );
}
