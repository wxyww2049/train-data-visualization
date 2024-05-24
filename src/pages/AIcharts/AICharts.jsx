import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { postQueryFn } from "../../query/postQueryFn";
import { Box, Button, Paper, TextField } from "@mui/material";
import { AIChartURL } from "../../constants/url";
import Loading from "../../compents/loading";
import Excels from "../../compents/Excels";

export default function AICharts() {
  const { isSuccess, data, mutate, isPending } = useMutation({
    mutationFn: postQueryFn,
  });
  const [question, setQuestion] = React.useState("");
  const fetchChart = () => {
    if (question === "") return;
    mutate({
      queryKey: [AIChartURL, {}, { question: question }],
      method: "post",
    });
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper sx={{ maxWidth: "1300px", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 6,
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <TextField
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            label="输入需要可视化的问题"
            sx={{ width: "60%", maxWidth: 800 }}
            placeholder="车次的发车时刻是怎样分布的?"
          />
          <Button
            onClick={fetchChart}
            variant="contained"
            sx={{ marginTop: 4 }}
          >
            生成图表
          </Button>
        </Box>
      </Paper>
      <Paper
        sx={{
          maxWidth: "1300px",
          width: "100%",
          margin: 3,
          display: "flex",
          flexDirection: "column",
          padding: 3,
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Excels />
      </Paper>

      <Paper
        sx={{
          maxWidth: "1300px",
          width: "100%",
          margin: 3,
          display: "flex",
          flexDirection: "column",
          padding: 3,
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        {isPending && <Loading />}
        {isSuccess && <img src={"data:image/png;base64, " + data.data.data} />}
      </Paper>
    </Box>
  );
}
