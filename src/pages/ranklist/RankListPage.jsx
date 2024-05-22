import React, { useEffect } from "react";
import RankList from "../../compents/RankList";
import { Box } from "@mui/material";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { RankListCity, RankListStation } from "../../constants/url";
import { postQueryFn } from "../../query/postQueryFn";
import Loading from "../../compents/loading";

export default function RankListPage() {
  const {
    isFetching: cityFetching,
    isSuccess: citySuccess,
    data: cities,
  } = useQuery({
    queryKey: [RankListCity],
    queryFn: postQueryFn,
  });
  const {
    isFetching: stationFetching,
    isSuccess: stationSuccess,
    data: stations,
  } = useQuery({
    queryKey: [RankListStation],
    queryFn: postQueryFn,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {stationFetching && <Loading />}
      {stationSuccess && !stationFetching && (
        <Box sx={{ width: "40%" }}>
          <RankList
            ydata={stations.data.data.map((item) => item.station)}
            xdata={stations.data.data.map((item) => item.hot)}
            title="车站热度排行"
          />
        </Box>
      )}
      {cityFetching && <Loading />}
      {citySuccess && !cityFetching && (
        <Box sx={{ width: "40%" }}>
          <RankList
            ydata={cities.data.data.map((item) => item.city)}
            xdata={cities.data.data.map((item) => item.hot)}
            title="城市热度排行"
          />
        </Box>
      )}
    </Box>
  );
}
