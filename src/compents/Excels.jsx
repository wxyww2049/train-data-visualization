import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const tTitle = [
  "id",
  "train_id",
  "train_class_name",
  "start_station_name",
  "end_station_name",
  "train_code",
  "arrive_day_diff",
  "arrive_time",
  "start_time",
  "station_name",
  "station_no",
  "station_code",
  "area_name",
  "lng",
  "lat",
  "wz",
  "m",
  "o",
  "a9",
  "a1",
  "a4",
  "a3",
];
const tColomns = [
  [
    "0",
    "0100000Z1630",
    "直特",
    "哈尔滨",
    "北京",
    "Z16",
    "0",
    "21:15:00",
    "21:15:00",
    "哈尔滨",
    "1",
    "64",
    "哈尔滨",
    "126.626363",
    "45.759174",
    ,
    ,
    ,
    ,
    ,
    ,
    ,
  ],
  [
    "1",
    "020000D13210",
    "动车",
    "佳木斯",
    "珲春",
    "D132",
    "0",
    "10:29:00",
    "10:40:00",
    "哈尔滨",
    "3",
    "64",
    "哈尔滨",
    "126.626363",
    "45.759174",
    "127",
    "204",
    "127",
    ,
    ,
    ,
    ,
  ],
  [
    "2",
    "0300000T1807",
    "特快",
    "牡丹江",
    "北京",
    "T18",
    "0",
    "16:56:00",
    "16:56:00",
    "牡丹江",
    "1",
    "876",
    "牡丹江",
    "129.605896",
    "44.588158",
    ,
    ,
    ,
    ,
    ,
    ,
    ,
  ],
  [
    "3",
    "2400000G4120",
    "高速",
    "北京南",
    "芜湖",
    "G41",
    "0",
    "16:38:00",
    "16:42:00",
    "合肥南",
    "4",
    "70",
    "合肥",
    "117.28484",
    "31.800544",
    "536",
    "863.5",
    "536",
    "1853.5",
    ,
    ,
    ,
  ],
  [
    "4",
    "2400000G790N",
    "高速",
    "北京西",
    "香港西九龙",
    "G79",
    "0",
    "15:16:00",
    "15:20:00",
    "长沙南",
    "5",
    "37",
    "长沙",
    "113.059419",
    "28.150177",
    "839.5",
    "1343.5",
    "839.5",
    "2644.5",
    ,
    ,
    ,
  ],
  [
    "5",
    "2400000T171D",
    "特快",
    "北京",
    "牡丹江",
    "T17",
    "1",
    "10:03:00",
    "10:06:00",
    "横道河子",
    "14",
    "540",
    "牡丹江",
    "129.06775",
    "44.811946",
    "264",
    ,
    ,
    ,
    "264",
    "1311",
    "876",
  ],
  [
    "6",
    "2400000Z370E",
    "直特",
    "北京西",
    "武昌",
    "Z37",
    "0",
    "20:30:00",
    "20:30:00",
    "北京西",
    "1",
    "5",
    "北京",
    "116.315031",
    "39.893457",
    ,
    ,
    ,
    ,
    ,
    ,
    ,
  ],
];

// const rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "MUI X", col2: "is awesome" },
//   { id: 3, col1: "Material UI", col2: "is amazing" },
//   { id: 4, col1: "MUI", col2: "" },
//   { id: 5, col1: "Joy UI", col2: "is awesome" },
//   { id: 6, col1: "MUI Base", col2: "is amazing" },
// ];

// const columns = [
//   { field: "id", hide: true },
//   { field: "col1", headerName: "Column 1", width: 150 },
//   { field: "col2", headerName: "Column 2", width: 150 },
// ];
export default function Excels() {
  const rows = tColomns.map((e, i) => {
    let ret = {};
    e.forEach((v, j) => {
      ret[tTitle[j]] = v;
    });
    return ret;
  });

  const columns = tTitle.map((t, i) => ({ field: t, headerName: t }));
  console.log(rows, columns);
  return (
    <div style={{ maxWidth: "100%", height: "400px" }}>
      <DataGrid
        rows={rows}
        isCellEditable={(e) => {
          return false;
        }}
        columns={columns}
      />
    </div>
  );
}
