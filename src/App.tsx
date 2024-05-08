// @ts-nocheck
import { useEffect, useRef } from "react";
import "./App.css";
import ForceGraph from "./ForceGraph";

var nodes = [
  {
    id: 0,
    name: "A",
  },
  {
    id: 1,
    name: "B",
  },
  {
    id: 2,
    name: "C",
  },
  {
    id: 3,
    name: "D",
  },
  {
    id: 4,
    name: "E",
  },
];

var edges = [
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
];

function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const graph = ForceGraph(
        {
          nodes: [
            { id: "Alice", group: 2 },
            { id: "Bob", group: 1 },
            { id: "Carol", group: 1 },
            { id: "David", group: 2 },
          ],
          links: [
            { source: "Bob", target: "Alice", value: 1 },
            { source: "Carol", target: "Bob", value: 2 },
            { source: "David", target: "Alice", value: 3 },
          ],
        },
        {
          nodeId: (d) => d.id,
          nodeGroup: (d) => d.group,
          nodeTitle: (d) => `${d.id}\n${d.group}`,
          linkStrokeWidth: (l) => Math.sqrt(l.value),
          width: 600,
          height: 600,
          nodeRadius: 10,
        }
      );
      ref.current.innerHTML = "";
      ref.current.appendChild(graph);
    }
  }, []);
  return (
    <div className="App">
      <div ref={ref}></div>
    </div>
  );
}

export default App;
