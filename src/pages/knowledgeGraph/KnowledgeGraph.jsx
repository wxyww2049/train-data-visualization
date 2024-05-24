import React, { useEffect } from "react";
import { GraphCanvas, darkTheme } from "reagraph";
import staicNodes from "../../assets/nodes.json";
import staicEdges from "../../assets/edges.json";
import { useMutation } from "@tanstack/react-query";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { postQueryFn } from "../../query/postQueryFn";
import { GRAPHURL } from "../../constants/url";
// const nodes = [
//   { id: "0100000Z1630", label: "Z16" },
//   { id: "64", label: "heb" },
//   { id: "2", label: "bji" },
//   { id: "010000C10300", label: "C103" },
//   { id: "253", label: "bzh" },
//   { id: "468", label: "fzh" },
//   { id: "1469", label: "yla" },
//   { id: "664", label: "jms" },
//   { id: "2076", label: "hli" },
//   { id: "542", label: "hga" },
//   { id: "010000C10701", label: "C107" },
// ];

// const edges = [
//   { id: "0100000Z1630->64", source: "0100000Z1630", target: "64" },
//   { id: "0100000Z1630->2", source: "0100000Z1630", target: "2" },
//   { id: "010000C10300->64", source: "010000C10300", target: "64" },
//   { id: "010000C10300->253", source: "010000C10300", target: "253" },
//   { id: "010000C10300->468", source: "010000C10300", target: "468" },
//   { id: "010000C10300->1469", source: "010000C10300", target: "1469" },
//   { id: "010000C10300->664", source: "010000C10300", target: "664" },
//   { id: "010000C10300->2076", source: "010000C10300", target: "2076" },
//   { id: "010000C10300->542", source: "010000C10300", target: "542" },
//   { id: "010000C10701->64", source: "010000C10701", target: "64" },
// ];

export default function KnowledgeGraph() {
  const [nodes, setNodes] = React.useState(staicNodes);
  const [edges, setEdges] = React.useState(staicEdges);
  const { isSuccess, isPending, isError, data, mutate } = useMutation({
    mutationFn: postQueryFn,
  });
  // console.log(nodes, edges);

  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      const { nodes, edges } = data.data.data;
      setNodes(
        nodes.map((node) => ({
          ...node,
          fill: "#528f26",

          icon: isNaN(node.id) ? "/train.png" : "/station.png",
        }))
      );
      setEdges(edges);
    }
  }, [isSuccess]);

  return (
    <div>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        theme={darkTheme}
        edgeArrowPosition="end"
        onNodeClick={(node) => {
          console.log("click", node);
          mutate({
            queryKey: [GRAPHURL, {}, { id: node.id }],
            method: "post",
          });
        }}
      />
    </div>
  );
}
